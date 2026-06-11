"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-butter-light shadow-soft">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} — görsel ${active + 1}`}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, i) => (
            <button
              key={image}
              onClick={() => setActive(i)}
              aria-label={`${i + 1}. görseli göster`}
              className={cn(
                "relative size-20 overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer",
                i === active
                  ? "ring-3 ring-burgundy ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
