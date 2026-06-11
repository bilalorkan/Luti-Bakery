"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import CartLineItem from "@/components/cart/CartLineItem";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);

  if (!mounted) {
    return <div className="mx-auto max-w-4xl px-4 py-24" />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <p className="font-hand text-2xl text-burgundy rotate-[-1deg] inline-block">neredeyse hazır</p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa mb-10">Sepetim</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-butter-light px-6 py-20 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-cream">
            <ShoppingBag className="size-8 text-caramel" />
          </div>
          <p className="font-display text-2xl text-cocoa">Sepetiniz boş görünüyor</p>
          <p className="max-w-sm text-cocoa/60">
            Fırından yeni çıkan cookie ve brownie&apos;ler sizi bekliyor.
          </p>
          <Link href="/products">
            <Button size="lg">
              Ürünlere Göz At <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] items-start">
          <div className="divide-y divide-cocoa/10 rounded-[2rem] bg-cream-soft px-6 py-2 shadow-soft">
            {items.map((item) => (
              <CartLineItem key={item.product.id} item={item} />
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 rounded-[2rem] bg-butter-light p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-cocoa">Sipariş Özeti</h2>
            <div className="flex justify-between text-cocoa/70">
              <span>Ara toplam</span>
              <span className="font-semibold text-cocoa">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-cocoa/70">
              <span>Kargo</span>
              <span className="font-semibold text-cocoa">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? "Bedava 🎉" : "Ödeme adımında"}
              </span>
            </div>
            <div className="border-t border-cocoa/15 pt-4 flex justify-between">
              <span className="font-semibold text-cocoa">Toplam</span>
              <span className="font-display text-2xl font-semibold text-cocoa">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full">
                Siparişi Tamamla <ArrowRight className="size-5" />
              </Button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
