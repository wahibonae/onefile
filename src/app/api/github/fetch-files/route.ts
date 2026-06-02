import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { Octokit } from '@octokit/rest'
import { DOCUMENT_EXTENSIONS } from '@/constants/files'
import { mapWithConcurrency } from '@/utils/concurrency'

interface FileRequest {
  path: string
  sha: string
}

// Cap how much work a single import request can trigger. The client sends every
// selected file in one request, so these bounds must be enforced server-side.
const MAX_FILES_PER_IMPORT = 500 // matches the public-repo import limit
const GITHUB_FETCH_CONCURRENCY = 5 // simultaneous GitHub API fetches
const MAX_TOTAL_BYTES = 50 * 1024 * 1024 // 50MB of source content per import

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

    if (files.length > MAX_FILES_PER_IMPORT) {
      return NextResponse.json(
        {
          error: `Too many files selected (${files.length}). Please import at most ${MAX_FILES_PER_IMPORT} files at a time.`,
        },
        { status: 413 }
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

    // Fetch files with bounded concurrency. This was previously an unbounded
    // Promise.all(files.map(...)), which fanned out one in-flight request per
    // file and could exhaust the server heap on large repos.
    let totalBytes = 0
    const results = await mapWithConcurrency(files, GITHUB_FETCH_CONCURRENCY, async (fileInfo) => {
      // Best-effort total-byte budget: once enough source content has been
      // accumulated, skip the rest so a 500-file selection of large files cannot
      // build an unbounded response in memory (overshoot is bounded by concurrency).
      if (totalBytes >= MAX_TOTAL_BYTES) {
        return {
          path: fileInfo.path,
          error: 'Skipped: import size budget exceeded',
          success: false,
        }
      }
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo: repoName,
          path: fileInfo.path,
        })

        // Check if it's a file (not a directory)
        if ('content' in data && data.type === 'file') {
          totalBytes += typeof data.size === 'number' ? data.size : 0
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
