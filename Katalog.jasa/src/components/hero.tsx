import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-primary md:min-h-[90vh]">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-srawung.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
      </div>

      <Container className="relative flex min-h-[85vh] flex-col justify-center py-20 md:min-h-[90vh] md:py-24">
        <div className="max-w-2xl">
          <FadeIn>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Custom Signage &amp; Printing
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[4.5rem]">
              Wujudkan
              <br />
              signage impian
              <br />
              <span className="text-accent">Anda.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/50 md:text-lg">
              Papan nama, neon box, huruf timbul, hingga event booth.
              Dikerjakan oleh tangan yang sudah puluhan tahun — dengan garansi
              dan support 24/7.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Lihat Katalog
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/kontak"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "border-white/25 text-white hover:border-accent hover:bg-accent/10 hover:text-white",
                })}
              >
                Hubungi Kami
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}
