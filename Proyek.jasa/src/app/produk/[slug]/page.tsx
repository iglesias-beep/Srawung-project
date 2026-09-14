import ProdukDetailClient from "./ProdukDetailClient";
import { localProducts } from "@/lib/local-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProdukDetailClient slug={slug} />;
}
