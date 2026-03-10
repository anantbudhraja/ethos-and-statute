import { client } from '../../../sanity/lib'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return Response.json({ results: [] })
  }

  const results = await client.fetch(`
    *[_type == "article" && (
      title match $query ||
      excerpt match $query ||
      category match $query ||
      author match $query
    )] | order(publishedAt desc) {
      _id, title, slug, author, category, excerpt, readTime, publishedAt
    }
  `, { query: `*${query}*` })

  return Response.json({ results })
}