import { promises as fs } from 'fs'
import * as path from 'path'

// --- PDF via pdf-parse ---
async function processPdf(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
  const data = await pdfParse(buffer)
  return data.text
}

// --- DOCX via mammoth ---
async function processDocx(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mammoth = require('mammoth') as {
    extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }>
  }
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

// --- PPTX via jszip ---
async function processPptx(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const JSZip = require('jszip') as {
    new(): {
      loadAsync: (data: Buffer) => Promise<{
        files: Record<string, { async: (type: 'text') => Promise<string> } | null>
      }>
    }
  }
  const zip = new JSZip()
  const zipFile = await zip.loadAsync(buffer)

  let fullText = ''

  const slideFiles = Object.keys(zipFile.files).filter(
    name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
  )

  for (const slideFile of slideFiles) {
    const file = zipFile.files[slideFile]
    if (file) {
      const xmlContent = await file.async('text')
      const textMatches = xmlContent.match(/<a:t[^>]*>([^<]*)<\/a:t>/g)
      if (textMatches) {
        const slideText = textMatches
          .map(match => match.replace(/<[^>]*>/g, ''))
          .join(' ')
        fullText += slideText + '\n\n'
      }
    }
  }

  return fullText.trim()
}

// Type definitions for ExcelJS cell values
interface RichTextCell { richText: Array<{ text: string }> }
interface FormulaCell { result: string | number }
interface TextCell { text: string }
type CellValue = string | number | boolean | Date | RichTextCell | FormulaCell | TextCell | null | undefined

// --- XLSX/XLS via exceljs ---
async function processExcel(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ExcelJS = require('exceljs') as { Workbook: new() => {
    xlsx: { load: (buf: Buffer) => Promise<void> }
    eachSheet: (cb: (ws: {
      name: string
      eachRow: (cb: (row: { values: CellValue[] }) => void) => void
    }) => void) => void
  }}

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  let fullText = ''

  workbook.eachSheet(worksheet => {
    fullText += `-- { ${worksheet.name} } --\n\n`

    worksheet.eachRow(row => {
      const rowValues = row.values
      const rowText = rowValues
        .slice(1)
        .filter(cell => cell !== null && cell !== undefined && cell !== '')
        .map(cell => {
          if (typeof cell === 'object' && cell !== null) {
            if ('result' in cell) { return String((cell as FormulaCell).result) }
            if ('richText' in cell) { return (cell as RichTextCell).richText.map(t => t.text).join('') }
            if ('text' in cell) { return (cell as TextCell).text }
            return String(cell)
          }
          return String(cell)
        })
        .join('\t')

      if (rowText.trim()) {
        fullText += rowText + '\n'
      }
    })

    fullText += '\n'
  })

  return fullText.trim()
}

/**
 * Extract text from a document file (PDF, DOCX, PPTX, XLSX, XLS).
 * Called by fileProcessor/index.ts for files in DOCUMENT_EXTENSIONS.
 */
export async function extractDocument(absolutePath: string): Promise<string> {
  const ext = path.extname(absolutePath).toLowerCase()
  const buffer = await fs.readFile(absolutePath)

  switch (ext) {
    case '.pdf':
      return processPdf(buffer)
    case '.docx':
      return processDocx(buffer)
    case '.pptx':
      return processPptx(buffer)
    case '.xlsx':
    case '.xls':
      return processExcel(buffer)
    default:
      throw new Error(`Unsupported document type: ${ext}`)
  }
}
