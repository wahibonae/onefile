import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import mammoth from "mammoth";
import { getDocument } from "pdfjs-serverless";
import ExcelJS from "exceljs";
import { Semaphore, SemaphoreOverloadedError } from "@/utils/concurrency";

// Next.js enforces a 10MB request body limit on API routes.
// Files must be validated client-side before upload.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Bound how many document parses run AT ONCE. This guards against a burst of
// concurrent uploads piling up heap in the single Node process. It does NOT, by
// itself, prevent one pathological file from blocking the event loop: each parse
// runs largely synchronously on the one thread, so a single non-yielding parse
// wedges the process regardless of how many slots are free. Fully preventing that
// would require running the parsers off-thread (worker/child process) with a
// kill-timeout.
//
// Slots are acquired before the body is read, so WAITING requests hold no file
// data and excess load is shed with 503. The up-to-5 ACTIVE holders still stream
// their uploads, so `maxDuration` (below) bounds how long a slow client can pin a
// slot.
const MAX_CONCURRENT_EXTRACTIONS = 5;
const MAX_QUEUED_EXTRACTIONS = 25;
const extractionGate = new Semaphore(
  MAX_CONCURRENT_EXTRACTIONS,
  MAX_QUEUED_EXTRACTIONS
);

// Best-effort per-request time budget. Platforms that honor route maxDuration
// bound how long a slow upload can hold a slot; on a plain self-hosted Node
// server this is advisory, so a reverse-proxy read timeout is the real bound. The
// Content-Length precheck in POST also keeps oversized uploads from taking a slot.
export const maxDuration = 30;

// Bound the extracted-text output so a small input that expands hugely during
// parsing cannot build an unbounded string in memory.
const MAX_OUTPUT_CHARS = 20_000_000; // ~20M chars
// Cap pages/slides walked, so a file declaring a huge page/slide count cannot spin.
const MAX_PDF_PAGES = 5000;
const MAX_PPTX_SLIDES = 5000;

// Parsers report whether output was cut off (page/slide cap or output-size cap)
// so the client can warn the user instead of silently losing content.
interface ExtractResult {
  text: string;
  truncated: boolean;
}

// Use pdfjs-serverless for PDF processing (designed for serverless)
async function processPdf(arrayBuffer: ArrayBuffer): Promise<ExtractResult> {
  try {
    const document = await getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    }).promise;

    let fullText = "";
    let truncated = document.numPages > MAX_PDF_PAGES;

    const pageCount = Math.min(document.numPages, MAX_PDF_PAGES);
    for (let i = 1; i <= pageCount; i++) {
      const page = await document.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => (item as { str: string }).str)
        .join(" ");
      fullText += pageText + "\n";
      if (fullText.length > MAX_OUTPUT_CHARS) {
        truncated = true;
        break;
      }
    }

    return { text: fullText, truncated };
  } catch (error) {
    console.error("PDF processing error:", error);
    throw new Error("Failed to process PDF");
  }
}

// Process DOCX using mammoth (as requested)
async function processDocx(arrayBuffer: ArrayBuffer): Promise<ExtractResult> {
  try {
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return {
      text: result.value.slice(0, MAX_OUTPUT_CHARS),
      truncated: result.value.length > MAX_OUTPUT_CHARS,
    };
  } catch (error) {
    console.error("DOCX processing error:", error);
    throw new Error("Failed to process DOCX");
  }
}

// Process PPTX using JSZip
async function processPptx(buffer: Buffer): Promise<ExtractResult> {
  try {
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(buffer);

    let fullText = "";

    // Find all slide files (capped so a file with a huge slide count can't spin)
    const allSlides = Object.keys(zipFile.files).filter(
      (name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
    );
    let truncated = allSlides.length > MAX_PPTX_SLIDES;
    const slideFiles = allSlides.slice(0, MAX_PPTX_SLIDES);

    for (const slideFile of slideFiles) {
      const file = zipFile.file(slideFile);
      if (file) {
        const xmlContent = await file.async("text");

        // Extract text from slide XML
        const textMatches = xmlContent.match(/<a:t[^>]*>([^<]*)<\/a:t>/g);
        if (textMatches) {
          const slideText = textMatches
            .map((match) => match.replace(/<[^>]*>/g, ""))
            .join(" ");
          fullText += slideText + "\n\n";
        }
      }
      if (fullText.length > MAX_OUTPUT_CHARS) {
        truncated = true;
        break;
      }
    }

    return { text: fullText.trim(), truncated };
  } catch (error) {
    console.error("PPTX processing error:", error);
    throw new Error("Failed to process PPTX");
  }
}

// Type definitions for ExcelJS cell values
interface RichTextCell {
  richText: Array<{ text: string }>;
}

interface FormulaCell {
  result: string | number;
}

interface TextCell {
  text: string;
}

type CellValue = string | number | boolean | Date | RichTextCell | FormulaCell | TextCell | null | undefined;

// Process Excel files using ExcelJS
async function processExcel(arrayBuffer: ArrayBuffer): Promise<ExtractResult> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    let fullText = "";
    let truncated = false;

    // Process each sheet
    workbook.eachSheet((worksheet) => {
      if (fullText.length > MAX_OUTPUT_CHARS) {
        truncated = true;
        return;
      }
      // Add sheet header for context
      fullText += `-- { ${worksheet.name} } --\n\n`;

      // Extract text from each row
      worksheet.eachRow((row) => {
        if (fullText.length > MAX_OUTPUT_CHARS) {
          truncated = true;
          return;
        }
        // row.values is an array where index 0 is undefined, actual values start at index 1
        const rowValues = row.values as CellValue[];
        const rowText = rowValues
          .slice(1) // Skip the first undefined element
          .filter((cell) => cell !== null && cell !== undefined && cell !== "")
          .map((cell) => {
            // Handle different cell value types
            if (typeof cell === "object" && cell !== null) {
              // Handle formula cells or rich text
              if ("result" in cell) return cell.result;
              if ("richText" in cell)
                return cell.richText.map((t) => t.text).join("");
              if ("text" in cell) return cell.text;
              return String(cell);
            }
            return String(cell);
          })
          .join("\t");

        if (rowText.trim()) {
          fullText += rowText + "\n";
        }
      });

      fullText += "\n";
    });

    return { text: fullText.trim(), truncated };
  } catch (error) {
    console.error("Excel processing error:", error);
    throw new Error("Failed to process Excel file");
  }
}

async function extractDocument(req: NextRequest): Promise<NextResponse> {
  try {
    const contentType = req.headers.get("content-type") || "";

    let arrayBuffer: ArrayBuffer;
    let extension: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
          { status: 413 }
        );
      }

      arrayBuffer = await file.arrayBuffer();
      extension = file.name.split(".").pop()?.toLowerCase();
    } else {
      const { base64Data, fileName } = await req.json();

      if (!base64Data || !fileName) {
        return NextResponse.json(
          { error: "Missing base64Data or fileName" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.byteLength > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
          { status: 413 }
        );
      }

      arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );
      extension = fileName.split(".").pop()?.toLowerCase();
    }

    let result: ExtractResult;

    switch (extension) {
      case "pdf":
        result = await processPdf(arrayBuffer);
        break;

      case "docx":
        result = await processDocx(arrayBuffer);
        break;

      case "pptx":
        result = await processPptx(Buffer.from(arrayBuffer));
        break;

      case "xlsx":
      case "xls":
        result = await processExcel(arrayBuffer);
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported file type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ text: result.text, truncated: result.truncated });
  } catch (error) {
    console.error("Error processing file:", error);

    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Cheap precheck before taking a slot: reject obviously-oversized uploads up
  // front so they never occupy a concurrency slot while the body streams in.
  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
      { status: 413 }
    );
  }

  try {
    return await extractionGate.runExclusive(() => extractDocument(req));
  } catch (error) {
    if (error instanceof SemaphoreOverloadedError) {
      console.warn(
        `extract-text: shedding load with 503 (${extractionGate.inFlight} requests in flight)`
      );
      return NextResponse.json(
        {
          error:
            "Server is busy processing other files. Please retry in a moment.",
        },
        { status: 503, headers: { "Retry-After": "5" } }
      );
    }
    console.error("extract-text: unexpected error", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
