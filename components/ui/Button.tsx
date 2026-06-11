import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-burgundy text-cream hover:bg-burgundy-deep shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  secondary: "bg-cocoa text-cream hover:bg-cocoa-deep shadow-soft hover:-translate-y-0.5",
  ghost: "bg-transparent text-cocoa hover:bg-butter-light",
  outline:
    "bg-transparent text-cocoa border-2 border-cocoa/25 hover:border-cocoa/60 hover:bg-cream-soft",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
