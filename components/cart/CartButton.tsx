"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore, cartCount } from "@/lib/cart-store";

export default function CartButton() {
  const items = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  // Avoid hydration mismatch: persisted cart only exists on the client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? cartCount(items) : 0;

  return (
    <button
      onClick={openDrawer}
      aria-label={`Sepeti aç (${count} ürün)`}
      className="flex items-center gap-2 rounded-full bg-burgundy px-3.5 sm:px-5 py-2.5 font-semibold text-cream shadow-soft transition-all duration-200 hover:bg-burgundy-deep hover:shadow-lift hover:-translate-y-0.5 cursor-pointer"
    >
      <ShoppingBag className="size-5" />
      <span className="hidden sm:inline">Sepetim</span>
      {count > 0 && (
        <span className="flex size-5 items-center justify-center rounded-full bg-cream text-[11px] font-bold text-burgundy">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
