import { products } from "@/lib/seed-data"
import ProdukClient from "./ProdukClient"

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <ProdukClient slug={slug} />
}