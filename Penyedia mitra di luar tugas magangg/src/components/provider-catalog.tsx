"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  MessageSquareText,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatPriceLabel } from "@/lib/format";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import type { ProviderWithCategory } from "@/lib/data";

type SortKey = "populer" | "rating" | "termurah" | "termahal";

const priceRanges = [
  { id: "all", label: "Semua harga", min: 0, max: Infinity },
  { id: "murah", label: "Di bawah Rp500rb", min: 0, max: 500000 },
  { id: "menengah", label: "Rp500rb – Rp2jt", min: 500000, max: 2000000 },
  { id: "mahal", label: "Di atas Rp2jt", min: 2000000, max: Infinity },
];

const ratingOptions = [
  { id: "all", label: "Semua rating", min: 0 },
  { id: "4", label: "4.0 ke atas", min: 4 },
  { id: "4.5", label: "4.5 ke atas", min: 4.5 },
];

type FilterState = {
  q: string;
  location: string;
  price: string;
  rating: string;
  sort: SortKey;
};

type FilterContextValue = {
  state: FilterState;
  set: (patch: Partial<FilterState>) => void;
  reset: () => void;
  locations: string[];
};

const FilterContext = createContext<FilterContextValue | null>(null);

function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within ProviderCatalog");
  return ctx;
}

function applyFilters(providers: ProviderWithCategory[], state: FilterState) {
  const q = state.q.trim().toLowerCase();
  let result = providers;

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q)
    );
  }
  if (state.location) {
    result = result.filter((p) => p.location === state.location);
  }
  const price = priceRanges.find((r) => r.id === state.price) ?? priceRanges[0];
  result = result.filter(
    (p) => p.priceFrom >= price.min && p.priceFrom <= price.max
  );
  const rating = ratingOptions.find((r) => r.id === state.rating) ?? ratingOptions[0];
  result = result.filter((p) => p.rating >= rating.min);

  const sorted = [...result];
  switch (state.sort) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "termurah":
      sorted.sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "termahal":
      sorted.sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "populer":
    default:
      sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
  }
  return sorted;
}

export function ProviderCatalog({
  providers,
  locations,
  defaultQ = "",
  defaultLocation = "",
}: {
  providers: ProviderWithCategory[];
  locations: string[];
  defaultQ?: string;
  defaultLocation?: string;
}) {
  const [state, setState] = useState<FilterState>({
    q: defaultQ,
    location: defaultLocation,
    price: "all",
    rating: "all",
    sort: "populer",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const ctxValue = useMemo<FilterContextValue>(
    () => ({
      state,
      set: (patch) => setState((prev) => ({ ...prev, ...patch })),
      reset: () =>
        setState({
          q: "",
          location: "",
          price: "all",
          rating: "all",
          sort: "populer",
        }),
      locations,
    }),
    [state, locations]
  );

  const results = useMemo(
    () => applyFilters(providers, state),
    [providers, state]
  );

  const [prevDefaults, setPrevDefaults] = useState(() => ({
    q: defaultQ,
    location: defaultLocation,
  }));
  if (
    prevDefaults.q !== defaultQ ||
    prevDefaults.location !== defaultLocation
  ) {
    setPrevDefaults({ q: defaultQ, location: defaultLocation });
    setState((prev) => ({
      ...prev,
      q: defaultQ,
      location: defaultLocation,
    }));
  }

  return (
    <FilterContext.Provider value={ctxValue}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* ===== FILTER PANEL ===== */}
        <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-72">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl border border-sand/70 bg-white px-5 py-3.5 text-sm font-bold text-ink shadow-soft lg:hidden"
            aria-expanded={mobileFiltersOpen}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-gold" />
              Filter & Urutkan
            </span>
            <span
              className={cn(
                "text-xs font-semibold text-ink-3 transition-transform",
                mobileFiltersOpen && "rotate-180"
              )}
            >
              Buka
            </span>
          </button>

          <div
            className={cn(
              "mt-3 rounded-2xl border border-sand/70 bg-white p-5 shadow-soft lg:mt-0 lg:block",
              mobileFiltersOpen ? "block" : "hidden"
            )}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Filter
              </h2>
              <button
                type="button"
                onClick={() => ctxValue.reset()}
                className="text-xs font-bold text-gold-deep hover:text-gold"
              >
                Reset semua
              </button>
            </div>

            <FilterBlock label="Kata kunci">
              <FilterSearchInput />
            </FilterBlock>

            <FilterBlock label="Lokasi">
              <FilterLocationSelect />
            </FilterBlock>

            <FilterBlock label="Rentang harga">
              <div className="space-y-2">
                {priceRanges.map((r) => (
                  <FilterRadio
                    key={r.id}
                    name="price"
                    value={r.id}
                    label={r.label}
                    checked={state.price === r.id}
                    onChange={(v) => ctxValue.set({ price: v })}
                  />
                ))}
              </div>
            </FilterBlock>

            <FilterBlock label="Rating minimum">
              <div className="space-y-2">
                {ratingOptions.map((r) => (
                  <FilterRadio
                    key={r.id}
                    name="rating"
                    value={r.id}
                    label={r.label}
                    checked={state.rating === r.id}
                    onChange={(v) => ctxValue.set({ rating: v })}
                  />
                ))}
              </div>
            </FilterBlock>
          </div>
        </aside>

        {/* ===== RESULTS ===== */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-2">
              Menampilkan{" "}
              <span className="font-extrabold text-gold-deep">{results.length}</span>{" "}
              penyedia jasa
            </p>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              Urutkan
              <SortSelect />
            </label>
          </div>

          {results.length === 0 ? (
            <EmptyState onReset={() => ctxValue.reset()} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <CatalogCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </FilterContext.Provider>
  );
}

function FilterBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2.5 text-xs font-bold tracking-wider text-ink-3 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

function FilterSearchInput() {
  const { state, set } = useFilters();
  return (
    <input
      type="text"
      value={state.q}
      onChange={(e) => set({ q: e.target.value })}
      placeholder="Cari di hasil ini..."
      className="h-10 w-full rounded-lg border border-ink/15 bg-cream px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-gold focus:ring-2 focus:ring-gold/20"
    />
  );
}

function FilterLocationSelect() {
  const { state, set, locations } = useFilters();
  return (
    <select
      value={state.location}
      onChange={(e) => set({ location: e.target.value })}
      className="h-10 w-full appearance-none rounded-lg border border-ink/15 bg-cream px-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
    >
      <option value="">Semua lokasi</option>
      {locations.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}

function FilterRadio({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-4 accent-[#b8892e]"
      />
      {label}
    </label>
  );
}

function SortSelect() {
  const { state, set } = useFilters();
  return (
    <select
      value={state.sort}
      onChange={(e) => set({ sort: e.target.value as SortKey })}
      className="h-10 rounded-lg border border-ink/15 bg-white px-3 pr-8 text-sm font-semibold text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
    >
      <option value="populer">Paling populer</option>
      <option value="rating">Rating tertinggi</option>
      <option value="termurah">Harga termurah</option>
      <option value="termahal">Harga termahal</option>
    </select>
  );
}

function CatalogCard({ provider }: { provider: ProviderWithCategory }) {
  const waMessage = `Halo ${provider.name}, saya menemukan jasa Anda di KatalogJasa.biz.id. Saya ingin bertanya tentang ${provider.category.name}.`;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link
        href={`/jasa/${provider.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
        aria-label={`Lihat profil ${provider.name}`}
      />
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-2">
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg leading-snug font-semibold text-ink">
          {provider.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-2">
          {provider.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
          <Stars value={provider.rating} starClassName="size-3.5" />
          <span className="font-semibold text-ink">
            {provider.rating.toFixed(1)}
          </span>
          <span className="text-ink-3">({provider.reviewsCount})</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink-3 uppercase">
              Mulai dari
            </p>
            <p className="text-base font-extrabold text-gold-deep">
              {formatPriceLabel(provider.priceFrom)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-ink-3">
              <MapPin className="size-3.5 text-gold" />
              {provider.location}
            </span>
            <a
              href={`https://wa.me/${provider.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 grid size-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white transition-transform hover:scale-110"
              aria-label={`Chat WhatsApp ${provider.name}`}
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-sand bg-white/60 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-gold-pale text-gold-deep">
        <SearchX className="size-7" />
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-ink">
          Tidak ada penyedia jasa yang cocok
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-2">
          Coba ubah kata kunci, lokasi, atau rentang harga untuk mendapatkan
          hasil yang lebih sesuai.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-forest-2"
      >
        <MessageSquareText className="size-4" />
        Reset filter
      </button>
    </div>
  );
}
