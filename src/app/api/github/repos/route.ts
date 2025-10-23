import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { Octokit } from '@octokit/rest'

export async function GET(): Promise<NextResponse> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to access GitHub repositories' },
        { status: 401 }
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

    // Fetch user's repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    })

    // Return formatted repository list
    const formattedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: repo.owner.login,
      private: repo.private,
      description: repo.description,
      default_branch: repo.default_branch,
      updated_at: repo.updated_at,
    }))

    return NextResponse.json({ repositories: formattedRepos })
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)

    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}
