import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Proyekjasa" className="h-9 w-9" />
              <span className="text-lg font-bold font-[family-name:var(--font-display)] text-text-primary tracking-tight">
                Proyekjasa
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Spesialis custom signage & printing premium. Logam, akrilik, neon � material yang
              presisi, solid, dan tahan lama.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/katalog", label: "Katalog" },
                { href: "/blog", label: "Blog" },
                { href: "/tentang-kami", label: "Tentang Kami" },
                { href: "/kontak", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-4">
              Produk
            </h3>
            <ul className="space-y-2.5">
              {["Papan Nama", "Neon Box", "Huruf Timbul", "Sticker Branding"].map((item) => (
                <li key={item}>
                  <Link
                    href="/katalog"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-accent-brass mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent-brass/50" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent-brass/50" />
                <span>info@customsignage.co.id</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent-brass/50" />
                <span>Jl. Contoh No. 123, Surabaya</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent-brass/50" />
                <span>Senin - Sabtu: 08.00 - 17.00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Proyekjasa. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-brass/40" />
            Built with precision
          </div>
        </div>
      </div>
    </footer>
  );
}
