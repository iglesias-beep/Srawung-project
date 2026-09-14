import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/data";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "KatalogJasa.biz.id — Cari Jasa Terpercaya di Sekitarmu",
    template: "%s | KatalogJasa.biz.id",
  },
  description:
    "Direktori & marketplace jasa terpercaya. Cari, bandingkan, dan hubungi penyedia jasa berkualitas — cleaning service, reparasi, desain, event, dan lainnya.",
  keywords: [
    "katalog jasa",
    "direktori jasa",
    "cleaning service",
    "service AC",
    "tukang",
    "jasa terpercaya",
    "indonesia",
  ],
  openGraph: {
    title: "KatalogJasa.biz.id",
    description:
      "Cari jasa terpercaya di sekitarmu. Bandingkan rating, harga, dan ulasan sebelum memutuskan.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const categories = await getCategories();
  const headerCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon,
  }));

  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${fraunces.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col">
        <SiteHeader categories={headerCategories} />
        <main className="flex-1">{children}</main>
        <SiteFooter categories={headerCategories} />
      </body>
    </html>
  );
}
