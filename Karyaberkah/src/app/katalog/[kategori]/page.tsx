import { categories } from "@/lib/seed-data"
import KategoriClient from "./KategoriClient"

export function generateStaticParams() {
  return categories.map((category) => ({
    kategori: category.slug,
  }))
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>
}) {
  const { kategori } = await params

  return <KategoriClient kategori={kategori} />
}