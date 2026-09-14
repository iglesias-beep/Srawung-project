import Link from "next/link";
import { AtSign, Globe, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";

export type FooterCategory = {
  slug: string;
  name: string;
  icon: string;
};

export function SiteFooter({ categories }: { categories: FooterCategory[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-deep text-cream">
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-gold-2 to-gold-deep text-white shadow-gold">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight text-white">
                Katalog<span className="text-gold-2">Jasa</span>
              </span>
              <span className="block text-[10px] font-bold tracking-[0.28em] text-cream/50 uppercase">
                biz.id
              </span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-cream/60">
            Direktori & marketplace jasa terpercaya. Temukan, bandingkan, dan
            hubungi penyedia jasa berkualitas di sekitarmu — semuanya dalam satu
            tempat.
          </p>
          <div className="flex items-center gap-2">
            {[Globe, AtSign, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid size-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold-2 hover:text-gold-2"
                aria-label="Sosial media"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-gold-2 uppercase">
            Jelajahi
          </h3>
          <ul className="space-y-3 text-sm text-cream/70">
            {[
              { href: "/", label: "Beranda" },
              { href: "/cari", label: "Cari Jasa" },
              { href: "/blog", label: "Blog & Artikel" },
              { href: "/tentang", label: "Tentang & FAQ" },
              { href: "/daftar-mitra", label: "Daftar Jadi Mitra" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-gold-2 uppercase">
            Kategori Populer
          </h3>
          <ul className="space-y-3 text-sm text-cream/70">
            {categories.map((c) => (
              <li key={c.slug} className="flex items-center gap-2">
                <CategoryIcon name={c.icon} className="size-3.5 text-gold-2" />
                <Link
                  href={`/kategori/${c.slug}`}
                  className="transition-colors hover:text-gold-2"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-gold-2 uppercase">
            Hubungi Kami
          </h3>
          <ul className="space-y-4 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-2" />
              <a
                href="mailto:halo@katalogjasa.biz.id"
                className="transition-colors hover:text-gold-2"
              >
                halo@katalogjasa.biz.id
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-2" />
              <a
                href="tel:+62218888888"
                className="transition-colors hover:text-gold-2"
              >
                +62 21 8888 8888
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-2" />
              <span>
                Jl. Sudirman Kav. 52-53,
                <br />
                Jakarta Selatan, Indonesia
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} KatalogJasa.biz.id. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p>Dibuat dengan dedikasi untuk UMKM Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
