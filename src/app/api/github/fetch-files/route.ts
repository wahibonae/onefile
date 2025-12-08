import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { Octokit } from '@octokit/rest'
import { DOCUMENT_EXTENSIONS } from '@/constants/files'

interface FileRequest {
  path: string
  sha: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to access GitHub repositories' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { repo, files } = body as { repo: string; files: FileRequest[] }

    if (!repo || !files || !Array.isArray(files)) {
      return NextResponse.json(
        { error: 'Invalid request. Expected repo and files array' },
        { status: 400 }
      )
    }

    const [owner, repoName] = repo.split('/')

    if (!owner || !repoName) {
      return NextResponse.json(
        { error: 'Invalid repository format. Expected "owner/repo"' },
        { status: 400 }
      )
    }

    // Get the user's GitHub OAuth token from Clerk
    const clerk = await clerkClient()
    const tokenResponse = await clerk.users.getUserOauthAccessToken(
      userId,
      'github'
    )

    if (!tokenResponse.data || tokenResponse.data.length === 0) {
      return NextResponse.json(
        { error: 'No GitHub connection found. Please sign in with GitHub.' },
        { status: 403 }
      )
    }

    const githubToken = tokenResponse.data[0].token

    // Initialize Octokit with the user's token
    const octokit = new Octokit({
      auth: githubToken,
    })

    // Fetch all files in parallel
    const filePromises = files.map(async (fileInfo) => {
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo: repoName,
          path: fileInfo.path,
        })

        // Check if it's a file (not a directory)
        if ('content' in data && data.type === 'file') {
          const extension = '.' + fileInfo.path.split('.').pop()?.toLowerCase()

          if (DOCUMENT_EXTENSIONS.has(extension)) {
            return {
              path: fileInfo.path,
              base64Content: data.content,
              needsExtraction: true,
              size: data.size,
              success: true,
            }
          }

          const content = Buffer.from(data.content, 'base64').toString('utf-8')

          return {
            path: fileInfo.path,
            content,
            size: data.size,
            success: true,
          }
        }

        return {
          path: fileInfo.path,
          error: 'Not a file',
          success: false,
        }
      } catch (error) {
        console.error(`Error fetching file ${fileInfo.path}:`, error)
        return {
          path: fileInfo.path,
          error: 'Failed to fetch file',
          success: false,
        }
      }
    })

    const results = await Promise.all(filePromises)

    // Separate successful and failed fetches
    const successfulFiles = results.filter((r) => r.success)
    const failedFiles = results.filter((r) => !r.success)

    return NextResponse.json({
      files: successfulFiles,
      failed: failedFiles,
      total: files.length,
      successful: successfulFiles.length,
      failed_count: failedFiles.length,
    })
  } catch (error) {
    console.error('Error fetching GitHub files:', error)

    return NextResponse.json(
      { error: 'Failed to fetch files from GitHub' },
      { status: 500 }
    )
  }
}
