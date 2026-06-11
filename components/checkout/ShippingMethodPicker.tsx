"use client";

import { ArrowLeft, ArrowRight, Truck, Zap } from "lucide-react";
import type { ShippingMethod } from "@/types";
import { shippingMethods } from "@/lib/shipping";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

const icons: Record<string, typeof Truck> = { standard: Truck, express: Zap };

export default function ShippingMethodPicker({
  selected,
  freeShipping,
  onSelect,
  onBack,
  onNext,
}: {
  selected: ShippingMethod;
  freeShipping: boolean;
  onSelect: (method: ShippingMethod) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      {shippingMethods.map((method) => {
        const Icon = icons[method.id] ?? Truck;
        const isActive = selected.id === method.id;
        const isFree = freeShipping && method.id === "standard";
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method)}
            className={cn(
              "flex w-full items-center gap-4 rounded-3xl border-2 p-5 text-left transition-all duration-200 cursor-pointer",
              isActive
                ? "border-burgundy bg-cream-soft shadow-soft"
                : "border-cocoa/15 hover:border-cocoa/35"
            )}
          >
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                isActive ? "bg-burgundy text-cream" : "bg-butter-light text-cocoa"
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-display text-lg font-semibold text-cocoa">
                {method.name}
              </span>
              <span className="block text-sm text-cocoa/60">{method.description}</span>
            </span>
            <span className="font-display text-lg font-semibold text-cocoa">
              {isFree ? <span className="text-burgundy">Bedava</span> : formatPrice(method.price)}
            </span>
          </button>
        );
      })}

      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="size-5" /> Adrese Dön
        </Button>
        <Button size="lg" onClick={onNext}>
          Ödemeye Geç <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
