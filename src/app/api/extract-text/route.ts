import { NextRequest, NextResponse } from 'next/server'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import mammoth from 'mammoth'
import officegen from 'officegen'
import { Readable } from 'stream'
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
        const loader = new PDFLoader(tempFilePath)
        const docs = await loader.load()
        text = docs.map(doc => doc.pageContent).join('\n')
        
        // Clean up
        await unlink(tempFilePath)
        tempFilePath = null
        break

      case 'docx':
        const result = await mammoth.extractRawText({ arrayBuffer: buffer })
        text = result.value
        break

      case 'pptx':
        // Convert buffer to readable stream for officegen
        const stream = new Readable()
        stream.push(Buffer.from(buffer))
        stream.push(null)

        const pptx = officegen('pptx')
        
        // Process the PPTX file
        const slides: string[] = []
        
        // Read slides content
        pptx.on('finalize', () => {
          console.log('Finished processing PPTX')
        })

        pptx.on('error', (err: Error) => {
          console.log(err)
          throw err
        })

        // Extract text from each slide
        for (const slide of pptx.getSlides()) {
          const slideContent: string[] = []
          
          // Get text from shapes/textboxes
          if (slide.data && Array.isArray(slide.data)) {
            for (const item of slide.data) {
              if (item.options && item.options.text) {
                slideContent.push(item.options.text)
              }
            }
          }
          
          slides.push(slideContent.join('\n'))
        }
        
        text = slides.join('\n\n')
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