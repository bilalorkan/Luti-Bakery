"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative">
      <Link
        href={`/products/${product.slug}`}
        className="block overflow-hidden rounded-[2rem] bg-butter-light shadow-soft transition-all duration-300 group-hover:shadow-lift group-hover:-translate-y-1.5"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 font-hand text-base text-burgundy -rotate-3 shadow-soft">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-cocoa leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-cocoa/60 line-clamp-1">{product.shortDescription}</p>
          <p className="mt-3 font-display text-xl font-semibold text-cocoa">
            {formatPrice(product.price)}
            <span className="ml-1 font-sans text-sm font-normal text-cocoa/50">
              / {product.unit}
            </span>
          </p>
        </div>
      </Link>

      <button
        onClick={() => addItem(product)}
        aria-label={`${product.name} sepete ekle`}
        className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-burgundy text-cream shadow-soft transition-all duration-200 hover:bg-burgundy-deep hover:scale-110 active:scale-95 cursor-pointer"
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
