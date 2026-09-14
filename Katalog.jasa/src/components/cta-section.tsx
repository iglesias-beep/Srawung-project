import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative flex flex-col items-center gap-8 py-20 text-center md:py-28">
        <h2 className="max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance md:text-5xl">
          Wujudkan signage toko yang berkelas & tahan lama
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          Dari papan nama hingga totem — material premium, desain mewah,
          garansi perbaikan di setiap pemesanan.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/katalog"
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            Jelajahi Katalog
          </Link>
          <Link
            href="/kontak"
            className={buttonVariants({ variant: "outline", size: "lg", className: "border-white/25 text-white hover:bg-white/10 hover:text-white" })}
          >
            Hubungi Kami
          </Link>
        </div>
      </Container>
    </section>
  );
}
