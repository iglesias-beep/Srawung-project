import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react"

const produkLinks = [
  { label: "Papan Nama Custom", href: "/katalog" },
  { label: "Neon Box Custom", href: "/katalog" },
  { label: "Huruf Timbul Custom", href: "/katalog" },
  { label: "Rambu-Rambu Custom", href: "/katalog" },
  { label: "Totem & Pylon Sign", href: "/katalog" },
  { label: "Sticker Branding Mobil", href: "/katalog" },
]

const layananLinks = [
  { label: "Sticker Sandblast Kaca", href: "/katalog" },
  { label: "Sticker Cutting Custom", href: "/katalog" },
  { label: "Event Booth Custom", href: "/katalog" },
  { label: "E Kiosk & Charger Point", href: "/katalog" },
  { label: "Electric POP Display", href: "/katalog" },
]

export function Footer() {
  return (
    <footer id="kontak" className="border-t border-[var(--border-color)] bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.svg" alt="Karyaberkah" width={32} height={32} />
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                Karyaberkah
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Solusi custom signage & printing terpercaya. Papan nama, neon box,
              huruf timbul, dan segala kebutuhan branding bisnis Anda.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Karyaberkah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/70 hover:text-[var(--emerald)] transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                0812-3456-7890
              </a>
              <div className="flex items-center gap-2.5 text-white/70">
                <Mail className="h-4 w-4 shrink-0" />
                info@karyaberkah.co.id
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4 shrink-0" />
                Surabaya, Jawa Timur
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <Clock className="h-4 w-4 shrink-0" />
                Senin - Sabtu, 08.00 - 17.00 WIB
              </div>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-white mb-4">
              Produk
            </h3>
            <ul className="flex flex-col gap-2.5">
              {produkLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-white mb-4">
              Layanan
            </h3>
            <ul className="flex flex-col gap-2.5">
              {layananLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-white mb-4">
              Jam Operasional
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Senin - Jumat</span>
                <span>08.00 - 17.00</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Sabtu</span>
                <span>08.00 - 15.00</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Minggu</span>
                <span>Tutup</span>
              </div>
              <hr className="border-white/10" />
              <div className="text-white/50">
                <p>Melayani konsultasi dan pemesanan</p>
                <p>via WhatsApp 24 jam</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Karyaberkah. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link href="/katalog" className="hover:text-white transition-colors">Katalog</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
