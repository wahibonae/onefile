import { NextRequest, NextResponse } from 'next/server'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx"
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx"
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import os from 'os'

export async function POST(req: NextRequest) {
  let tempFilePath: string | null = null

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const extension = file.name.split('.').pop()?.toLowerCase()
    let text = ''

    switch (extension) {
      case 'pdf':
        // Create a temporary file
        tempFilePath = join(os.tmpdir(), `temp-${Date.now()}.pdf`)
        await writeFile(tempFilePath, Buffer.from(buffer))
        
        // Load and process the PDF
        const pdfLoader = new PDFLoader(tempFilePath)
        const pdfDocs = await pdfLoader.load()
        text = pdfDocs.map(doc => doc.pageContent).join('\n')
        
        // Clean up
        await unlink(tempFilePath)
        tempFilePath = null
        break

      case 'docx':
        // Create a temporary file for the docx
        tempFilePath = join(os.tmpdir(), `temp-${Date.now()}.docx`)
        await writeFile(tempFilePath, Buffer.from(buffer))
        
        // Load and process the DOCX
        const docxLoader = new DocxLoader(tempFilePath)
        const docxDocs = await docxLoader.load()
        text = docxDocs.map(doc => doc.pageContent).join('\n')
        
        // Clean up
        await unlink(tempFilePath)
        tempFilePath = null
        break

      case 'pptx':
        // Create a temporary file for the pptx
        tempFilePath = join(os.tmpdir(), `temp-${Date.now()}.pptx`)
        await writeFile(tempFilePath, Buffer.from(buffer))
        
        // Load and process the PPTX
        const pptxLoader = new PPTXLoader(tempFilePath)
        const pptxDocs = await pptxLoader.load()
        text = pptxDocs.map(doc => doc.pageContent).join('\n\n')
        
        // Clean up
        await unlink(tempFilePath)
        tempFilePath = null
        break

      default:
        return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error processing file:', error)
    
    // Clean up temp file if it exists
    if (tempFilePath) {
      try {
        await unlink(tempFilePath)
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError)
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
} 