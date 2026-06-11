"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { Field } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

interface PaymentErrors {
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PaymentForm({
  submitting,
  onBack,
  onSubmit,
}: {
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<PaymentErrors>({});

  const validate = (): PaymentErrors => {
    const next: PaymentErrors = {};
    if (cardName.trim().length < 5) next.cardName = "Kart üzerindeki ismi yazın";
    if (cardNumber.replace(/\s/g, "").length !== 16) next.cardNumber = "16 haneli kart numarası girin";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || +mm < 1 || +mm > 12) next.expiry = "AA/YY formatında girin";
    if (cvc.length < 3) next.cvc = "CVC girin";
    return next;
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) onSubmit();
      }}
      className="space-y-5"
    >
      <div className="rounded-3xl bg-butter-light p-4 flex items-center gap-3 text-sm text-cocoa/70">
        <Lock className="size-4 shrink-0 text-burgundy" />
        Bu bir tasarım önizlemesi — ödeme altyapısı (Stripe/iyzico) backend fazında bağlanacak.
        Kart bilgileriniz hiçbir yere gönderilmez.
      </div>

      <Field
        label="Kart Üzerindeki İsim"
        autoComplete="cc-name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        error={errors.cardName}
      />
      <Field
        label="Kart Numarası"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="0000 0000 0000 0000"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        error={errors.cardNumber}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Son Kullanma (AA/YY)"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="AA/YY"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          error={errors.expiry}
        />
        <Field
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={4}
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
          error={errors.cvc}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="button" variant="outline" size="lg" onClick={onBack} disabled={submitting}>
          <ArrowLeft className="size-5" /> Kargoya Dön
        </Button>
        <Button type="submit" size="lg" disabled={submitting}>
          <CreditCard className="size-5" />
          {submitting ? "Sipariş alınıyor..." : "Siparişi Onayla"}
        </Button>
      </div>
    </form>
  );
}
