import { articles } from "@/lib/seed-data"
import BlogDetailClient from "./BlogDetailClient"

export function generateStaticParams() {
  return articles
    .filter((article) => article.status === "published")
    .map((article) => ({
      slug: article.slug,
    }))
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <BlogDetailClient slug={slug} />
}