import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact-form";
import { waLink, waDefaultMessage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi Katalog Jasa untuk konsultasi gratis custom signage & printing: papan nama, neon box, huruf timbul, totem & pylon, sticker branding, dan event booth.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsappDisplay,
    note: "Balasan tercepat · 24/7",
    href: waLink(waDefaultMessage),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    note: "Untuk detail project & penawaran",
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: "@katalog.jasa",
    note: "Portofolio & project terbaru",
    href: siteConfig.instagram,
    external: true,
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: siteConfig.address,
    note: "Kunjungi showroom kami",
    href: "https://maps.google.com/?q=" + encodeURIComponent(siteConfig.address),
    external: true,
  },
];

export default function KontakPage() {
  return (
    <>
      <section className="border-b border-accent/20 bg-bg-soft">
        <Container className="py-10 md:py-14">
          <Breadcrumb items={[{ label: "Kontak" }]} />
          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-5xl">
            Mari bicarakan project Anda
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Konsultasi gratis tanpa mengikat. Ceritakan kebutuhan signage &
            printing Anda, dan tim kami akan membantu dari desain hingga
            pemasangan.
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Kirim Pesan
              </h2>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink md:text-3xl">
                Formulir Konsultasi
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Isi formulir di bawah — pesan Anda akan diteruskan langsung ke
                WhatsApp tim kami untuk respons tercepat.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Hubungi Langsung
              </h2>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink md:text-3xl">
                Saluran lainnya
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <Link
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 rounded-[16px] border border-line bg-bg-soft p-5 transition-all hover:border-accent/40 hover:bg-surface"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-ink group-hover:text-accent">
                          {channel.label}
                        </span>
                        <span className="mt-0.5 block break-all text-sm font-semibold text-primary">
                          {channel.value}
                        </span>
                        <span className="mt-0.5 block text-xs text-faint">
                          {channel.note}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex items-start gap-4 rounded-[16px] border border-line bg-bg-soft p-5 transition-all hover:border-accent/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-light/40 text-accent">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">
                    Jam Operasional
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-primary">
                    {siteConfig.hours}
                  </span>
                </span>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-accent/20 bg-bg-soft">
        <Container className="py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            Lokasi kami
          </h2>
          <div className="mt-6 aspect-[21/9] w-full overflow-hidden rounded-[16px] border border-line bg-surface">
            <iframe
              title="Lokasi Katalog Jasa"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                siteConfig.address
              )}&z=15&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-sm text-faint">
            *Peta ini menampilkan alamat placeholder. Alamat dan nomor kontak
            akan diperbarui dengan data resmi Katalog Jasa.
          </p>
        </Container>
      </section>
    </>
  );
}
