import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { Octokit } from '@octokit/rest'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to access GitHub repositories' },
        { status: 401 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const repo = searchParams.get('repo') // Format: "owner/repo"
    const branch = searchParams.get('branch') || 'main'

    if (!repo) {
      return NextResponse.json(
        { error: 'Repository parameter is required' },
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

    // Get the tree for the repository
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo: repoName,
      ref: `heads/${branch}`,
    })

    const treeSha = refData.object.sha

    // Get the full tree recursively
    const { data: treeData } = await octokit.git.getTree({
      owner,
      repo: repoName,
      tree_sha: treeSha,
      recursive: 'true',
    })

    // Filter and format the tree to only include files (not directories)
    const files = treeData.tree
      .filter((item) => item.type === 'blob') // Only files, not directories
      .map((item) => ({
        path: item.path,
        sha: item.sha,
        size: item.size,
        url: item.url,
      }))

    return NextResponse.json({
      repository: repo,
      branch,
      files,
    })
  } catch (error) {
    console.error('Error fetching GitHub repository tree:', error)

    // Handle specific error cases
    if (error && typeof error === 'object' && 'status' in error) {
      if (error.status === 404) {
        return NextResponse.json(
          { error: 'Repository or branch not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch repository tree' },
      { status: 500 }
    )
  }
}
