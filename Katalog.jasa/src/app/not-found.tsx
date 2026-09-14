import Link from "next/link";
import { Compass, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { waLink, waDefaultMessage } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-background">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-serif text-7xl font-semibold text-accent-light">404</p>
        <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Halaman yang Anda cari mungkin sudah dipindah atau tidak tersedia.
          Mari kembali menjelajah katalog produk kami.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            <Compass className="h-5 w-5" aria-hidden />
            Kembali ke Beranda
          </Link>
          <Link
            href={waLink(waDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Tanya via WhatsApp
          </Link>
        </div>
      </Container>
    </section>
  );
}
