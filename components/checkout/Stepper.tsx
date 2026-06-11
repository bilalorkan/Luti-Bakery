"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = ["Adres", "Kargo", "Ödeme", "Onay"];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                  done && "border-burgundy bg-burgundy text-cream",
                  active && "border-cocoa bg-cocoa text-cream",
                  !done && !active && "border-cocoa/20 text-cocoa/40"
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:block text-sm font-semibold",
                  active ? "text-cocoa" : done ? "text-burgundy" : "text-cocoa/40"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn("h-0.5 w-6 sm:w-10 rounded-full", done ? "bg-burgundy" : "bg-cocoa/15")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
