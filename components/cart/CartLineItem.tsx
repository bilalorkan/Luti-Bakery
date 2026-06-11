"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/types";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export default function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/products/${product.slug}`}
        onClick={closeDrawer}
        className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-butter-light"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            onClick={closeDrawer}
            className="font-semibold text-cocoa leading-snug hover:text-burgundy transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <button
            onClick={() => removeItem(product.id)}
            aria-label={`${product.name} ürününü sepetten çıkar`}
            className="p-1 text-cocoa/40 hover:text-burgundy transition-colors cursor-pointer"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <p className="text-sm text-cocoa/50">{formatPrice(product.price)} / {product.unit}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-cocoa/15 px-1 py-0.5">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Adedi azalt"
              className="flex size-7 items-center justify-center rounded-full text-cocoa hover:bg-butter-light transition-colors cursor-pointer"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold text-cocoa">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Adedi artır"
              className="flex size-7 items-center justify-center rounded-full text-cocoa hover:bg-butter-light transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="font-display font-semibold text-cocoa">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
