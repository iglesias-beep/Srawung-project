import KategoriClient from "./KategoriClient";
import { localCategories } from "@/lib/local-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localCategories.map((c) => ({ kategori: c.slug }));
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  return <KategoriClient kategori={kategori} />;
}
