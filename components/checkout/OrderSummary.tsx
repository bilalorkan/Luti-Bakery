"use client";

import Image from "next/image";
import type { CartItem, ShippingMethod } from "@/types";
import { cartSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export default function OrderSummary({
  items,
  shipping,
}: {
  items: CartItem[];
  shipping: ShippingMethod | null;
}) {
  const subtotal = cartSubtotal(items);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD && shipping?.id === "standard";
  const shippingCost = !shipping ? 0 : freeShipping ? 0 : shipping.price;
  const total = subtotal + shippingCost;

  return (
    <aside className="rounded-[2rem] bg-butter-light p-6 lg:sticky lg:top-28">
      <h2 className="font-display text-xl font-semibold text-cocoa mb-4">Sipariş Özeti</h2>

      <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-cream">
              <Image src={product.images[0]} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <span className="flex-1 text-sm text-cocoa/80 line-clamp-1">
              {product.name} <span className="text-cocoa/50">× {quantity}</span>
            </span>
            <span className="text-sm font-semibold text-cocoa">
              {formatPrice(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-cocoa/15 pt-4 text-sm">
        <div className="flex justify-between text-cocoa/70">
          <span>Ara toplam</span>
          <span className="font-semibold text-cocoa">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-cocoa/70">
          <span>Kargo {shipping ? `(${shipping.name})` : ""}</span>
          <span className="font-semibold text-cocoa">
            {!shipping ? "—" : freeShipping ? "Bedava 🎉" : formatPrice(shippingCost)}
          </span>
        </div>
        <div className="flex justify-between border-t border-cocoa/15 pt-3">
          <span className="font-semibold text-cocoa">Toplam</span>
          <span className="font-display text-xl font-semibold text-cocoa">{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  );
}
