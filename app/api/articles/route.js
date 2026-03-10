import { client } from '../../../sanity/lib'

export const dynamic = 'force-dynamic'

export async function GET() {
  const articles = await client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id, title, slug, author, category, excerpt, readTime, publishedAt, featured
    }
  `)
  return Response.json({ articles })
}