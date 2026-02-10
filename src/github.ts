export interface AuthorRepo {
  name: string
  description: string | null
  stars: number
  url: string
}

export interface AuthorData {
  username: string
  avatarUrl: string | null
  name: string | null
  bio: string | null
  repos: AuthorRepo[]
}

const API_BASE = 'https://api.github.com'

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) return null
  return res.json() as Promise<T>
}

interface GitHubUser {
  avatar_url: string
  name: string | null
  bio: string | null
}

interface GitHubRepo {
  name: string
  description: string | null
  stargazers_count: number
  html_url: string
  fork: boolean
}

async function fetchAuthor(
  username: string,
): Promise<Pick<AuthorData, 'avatarUrl' | 'name' | 'bio'>> {
  const user = await fetchJson<GitHubUser>(`${API_BASE}/users/${username}`)
  if (!user) return { avatarUrl: null, name: null, bio: null }
  return { avatarUrl: user.avatar_url, name: user.name, bio: user.bio }
}

async function fetchTopRepos(username: string, count = 3): Promise<AuthorRepo[]> {
  const repos = await fetchJson<GitHubRepo[]>(
    `${API_BASE}/users/${username}/repos?sort=stars&direction=desc&per_page=${count + 5}`,
  )
  if (!repos) return []
  return repos
    .filter((r) => !r.fork)
    .slice(0, count)
    .map((r) => ({
      name: r.name,
      description: r.description,
      stars: r.stargazers_count,
      url: r.html_url,
    }))
}

export async function fetchAuthorData(username: string): Promise<AuthorData> {
  const [author, repos] = await Promise.all([fetchAuthor(username), fetchTopRepos(username)])
  return { username, ...author, repos }
}

export async function fetchAllAuthors(usernames: string[]): Promise<Record<string, AuthorData>> {
  const unique = [...new Set(usernames)]
  const results = await Promise.all(unique.map(fetchAuthorData))
  return Object.fromEntries(results.map((d) => [d.username, d]))
}
