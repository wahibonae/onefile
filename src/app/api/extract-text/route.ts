import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import mammoth from "mammoth";
import { getDocument } from "pdfjs-serverless";
import ExcelJS from "exceljs";

// Use pdfjs-serverless for PDF processing (designed for serverless)
async function processPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const document = await getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    }).promise;

    let fullText = "";

    for (let i = 1; i <= document.numPages; i++) {
      const page = await document.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => (item as { str: string }).str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  } catch (error) {
    console.error("PDF processing error:", error);
    throw new Error("Failed to process PDF");
  }
}

// Process DOCX using mammoth (as requested)
async function processDocx(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("DOCX processing error:", error);
    throw new Error("Failed to process DOCX");
  }
}

// Process PPTX using JSZip
async function processPptx(buffer: Buffer): Promise<string> {
  try {
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(buffer);

    let fullText = "";

    // Find all slide files
    const slideFiles = Object.keys(zipFile.files).filter(
      (name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
    );

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
    }

    return fullText.trim();
  } catch (error) {
    console.error("PPTX processing error:", error);
    throw new Error("Failed to process PPTX");
  }
}

// Process Excel files using ExcelJS
async function processExcel(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    let fullText = "";

    // Process each sheet
    workbook.eachSheet((worksheet) => {
      // Add sheet header for context
      fullText += `-- { ${worksheet.name} } --\n\n`;

      // Extract text from each row
      worksheet.eachRow((row) => {
        // row.values is an array where index 0 is undefined, actual values start at index 1
        const rowValues = row.values as any[];
        const rowText = rowValues
          .slice(1) // Skip the first undefined element
          .filter((cell) => cell !== null && cell !== undefined && cell !== "")
          .map((cell) => {
            // Handle different cell value types
            if (typeof cell === "object" && cell !== null) {
              // Handle formula cells or rich text
              if ("result" in cell) return cell.result;
              if ("richText" in cell)
                return cell.richText.map((t: any) => t.text).join("");
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

    return fullText.trim();
  } catch (error) {
    console.error("Excel processing error:", error);
    throw new Error("Failed to process Excel file");
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    let text = "";

    switch (extension) {
      case "pdf":
        const arrayBuffer = await file.arrayBuffer();
        text = await processPdf(arrayBuffer);
        break;

      case "docx":
        const docxArrayBuffer = await file.arrayBuffer();
        text = await processDocx(docxArrayBuffer);
        break;

      case "pptx":
        const pptxBuffer = Buffer.from(await file.arrayBuffer());
        text = await processPptx(pptxBuffer);
        break;

      case "xlsx":
      case "xls":
        const excelArrayBuffer = await file.arrayBuffer();
        text = await processExcel(excelArrayBuffer);
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported file type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error processing file:", error);

    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
