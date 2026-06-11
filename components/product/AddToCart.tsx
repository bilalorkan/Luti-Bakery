"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import Button from "@/components/ui/Button";

export default function AddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1 rounded-full border-2 border-cocoa/15 px-2 py-1.5">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Adedi azalt"
          className="flex size-9 items-center justify-center rounded-full text-cocoa hover:bg-butter-light transition-colors cursor-pointer"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-8 text-center font-bold text-cocoa">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Adedi artır"
          className="flex size-9 items-center justify-center rounded-full text-cocoa hover:bg-butter-light transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        size="lg"
        className="flex-1 min-w-52"
        onClick={() => {
          addItem(product, quantity);
          setQuantity(1);
        }}
      >
        <ShoppingBag className="size-5" />
        Sepete Ekle — {formatPrice(product.price * quantity)}
      </Button>
    </div>
  );
}
