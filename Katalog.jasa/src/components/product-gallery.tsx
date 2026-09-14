"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
        <Image
          src={images[active]}
          alt={`${name} — foto ${active + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Tampilkan foto ${i + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-[12px] border bg-surface transition-all",
                i === active
                  ? "border-accent ring-2 ring-accent/40"
                  : "border-line hover:border-accent-light"
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
