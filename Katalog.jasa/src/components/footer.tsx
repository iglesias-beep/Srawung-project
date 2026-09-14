import Link from "next/link";
import Image from "next/image";
import { siteConfig, waLink } from "@/lib/site";

const footerNav = [
  { href: "/katalog", label: "Katalog" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-x-8 gap-y-10 px-6 pt-14 pb-10 md:px-10 md:grid-cols-3 lg:px-20 lg:gap-x-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg">
              <Image src="/kj-logo-brand.svg" alt="Katalog Jasa" width={36} height={36} />
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight text-white">
              Katalog<span className="text-accent-light">.Jasa</span>
            </span>
          </Link>
          <p className="mt-4 max-w-[280px] text-[0.82rem] leading-relaxed text-white/50">
            Custom signage & printing — papan nama, neon box, huruf timbul,
            hingga sticker branding.
          </p>
        </div>

        {/* Menu */}
        <nav aria-label="Menu footer">
          <h4 className="mb-4 text-[0.95rem] font-semibold text-white">Menu</h4>
          <ul className="space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.82rem] text-white/50 transition-colors hover:text-accent-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hubungi Kami */}
        <div>
          <h4 className="mb-4 text-[0.95rem] font-semibold text-white">Hubungi Kami</h4>
          <ul className="space-y-2 text-[0.82rem] text-white/50">
            <li>{siteConfig.address}</li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent-light"
              >
                {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-accent-light"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.hours}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent/20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-2 px-6 py-4 text-[0.8rem] text-white/40 md:px-10 lg:px-20">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. Semua hak dilindungi.</p>
          <p>Custom signage & printing dengan garansi perbaikan.</p>
        </div>
      </div>
    </footer>
  );
}
