import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { getAllProviders, getLocations } from "@/lib/data";
import { ProviderCatalog } from "@/components/provider-catalog";

type PageProps = {
  searchParams: Promise<{ q?: string; lokasi?: string }>;
};

export const metadata: Metadata = {
  title: "Cari Jasa",
  description:
    "Cari dan bandingkan penyedia jasa terpercaya berdasarkan kata kunci, lokasi, harga, dan rating.",
};

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q ?? "";
  const lokasi = params.lokasi ?? "";

  const [providers, locations] = await Promise.all([
    getAllProviders(q, lokasi),
    getLocations(),
  ]);

  return (
    <div className="container-page pb-16 pt-8 sm:pb-20 sm:pt-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-gold-deep"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Beranda
      </Link>

      <div className="mb-10">
        <p className="eyebrow mb-2">Hasil Pencarian</p>
        <h1 className="font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
          {q ? (
            <>
              Cari jasa{" "}
              <span className="text-gold">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            <>Semua Penyedia Jasa</>
          )}
        </h1>
        <p className="mt-3 flex max-w-2xl items-center gap-2 text-base leading-relaxed text-ink-2">
          <Search className="size-4 shrink-0 text-gold" />
          {providers.length > 0
            ? `${providers.length} penyedia jasa ditemukan di platform kami. Gunakan filter untuk mempersempit hasil.`
            : "Tidak ada hasil untuk pencarian ini. Coba kata kunci lain atau hapus filter."}
        </p>
      </div>

      <ProviderCatalog
        providers={providers}
        locations={locations}
        defaultQ={q}
        defaultLocation={lokasi}
      />
    </div>
  );
}
