import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, className, ...props }: FieldProps) {
  const fieldId = id ?? label;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-cocoa">
        {label}
      </label>
      <input
        id={fieldId}
        className={cn(
          "w-full rounded-2xl border-2 bg-cream-soft px-4 py-3 text-cocoa placeholder:text-cocoa/35 transition-colors focus:outline-none",
          error ? "border-burgundy" : "border-cocoa/15 focus:border-caramel"
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-burgundy-deep">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextareaField({ label, id, className, ...props }: TextareaFieldProps) {
  const fieldId = id ?? label;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-cocoa">
        {label}
      </label>
      <textarea
        id={fieldId}
        className="w-full rounded-2xl border-2 border-cocoa/15 bg-cream-soft px-4 py-3 text-cocoa placeholder:text-cocoa/35 transition-colors focus:border-caramel focus:outline-none"
        {...props}
      />
    </div>
  );
}
