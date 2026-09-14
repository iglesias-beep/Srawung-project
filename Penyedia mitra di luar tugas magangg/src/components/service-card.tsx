import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { formatPriceLabel, waLink } from "@/lib/format";
import type { ProviderWithCategory } from "@/lib/data";

export function ServiceCard({
  provider,
}: {
  provider: ProviderWithCategory;
}) {
  const waMessage = `Halo ${provider.name}, saya menemukan jasa Anda di KatalogJasa.biz.id. Saya ingin bertanya tentang ${provider.category.name}.`;
  const wa = waLink(provider.whatsapp, waMessage);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link
        href={`/jasa/${provider.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
        aria-label={`Lihat profil ${provider.name}`}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-white/90 backdrop-blur">
            {provider.category.name}
          </Badge>
        </div>
        {provider.verified ? (
          <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 backdrop-blur">
            <BadgeCheck className="size-5 text-gold" aria-label="Terverifikasi" />
          </span>
        ) : null}
        <span className="absolute bottom-3 left-3 rounded-full bg-forest/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          Mulai {formatPriceLabel(provider.priceFrom)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug font-semibold text-ink">
            {provider.name}
          </h3>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
          <Stars value={provider.rating} starClassName="size-3.5" />
          <span className="font-semibold text-ink">{provider.rating.toFixed(1)}</span>
          <span className="text-ink-3">({provider.reviewsCount} ulasan)</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="flex items-center gap-1.5 text-sm text-ink-2">
            <MapPin className="size-4 shrink-0 text-gold" />
            {provider.location}
          </span>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 grid size-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-soft transition-transform hover:scale-110"
            aria-label={`Chat WhatsApp ${provider.name}`}
          >
            <MessageCircle className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
