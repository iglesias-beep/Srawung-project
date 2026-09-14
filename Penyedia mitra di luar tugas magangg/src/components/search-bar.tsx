"use client";

import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchBar({
  locations = [],
  defaultQuery = "",
  defaultLocation = "",
  className,
}: {
  locations?: string[];
  defaultQuery?: string;
  defaultLocation?: string;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location) params.set("lokasi", location);
    const qs = params.toString();
    router.push(qs ? `/cari?${qs}` : "/cari");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-sand/80 bg-white p-2 shadow-lift sm:flex-row sm:rounded-full sm:items-center",
        className
      )}
    >
      <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 sm:px-5">
        <Search className="size-5 shrink-0 text-gold" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari jasa, misal: cleaning service, service AC..."
          className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3 sm:text-base"
        />
      </label>
      <span className="hidden h-8 w-px bg-sand sm:block" />
      <label className="flex min-w-0 items-center gap-3 px-3 py-2 sm:py-0 sm:px-2">
        <MapPin className="size-5 shrink-0 text-ink-3" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-ink outline-none sm:w-40 sm:text-base"
        >
          <option value="">Semua lokasi</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" variant="gold" size="lg" className="sm:shrink-0">
        <Search className="size-4" />
        <span className="sm:hidden">Cari Sekarang</span>
        <span className="hidden sm:inline">Cari</span>
      </Button>
    </form>
  );
}
