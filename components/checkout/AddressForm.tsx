"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Address } from "@/types";
import { Field, TextareaField } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  district: "",
  addressLine: "",
  postalCode: "",
  note: "",
};

function validate(address: Address): Partial<Record<keyof Address, string>> {
  const errors: Partial<Record<keyof Address, string>> = {};
  if (!address.firstName.trim()) errors.firstName = "Adınızı yazın";
  if (!address.lastName.trim()) errors.lastName = "Soyadınızı yazın";
  if (!/^0?5\d{9}$/.test(address.phone.replace(/\s/g, "")))
    errors.phone = "Geçerli bir cep telefonu girin (05XX...)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) errors.email = "Geçerli bir e-posta girin";
  if (!address.city.trim()) errors.city = "İl seçin";
  if (!address.district.trim()) errors.district = "İlçe yazın";
  if (address.addressLine.trim().length < 10) errors.addressLine = "Açık adresinizi yazın";
  return errors;
}

export default function AddressForm({
  initial,
  onSubmit,
}: {
  initial?: Address;
  onSubmit: (address: Address) => void;
}) {
  const [address, setAddress] = useState<Address>(initial ?? emptyAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const set = (key: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setAddress((a) => ({ ...a, [key]: e.target.value }));

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const nextErrors = validate(address);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) onSubmit(address);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad" autoComplete="given-name" value={address.firstName} onChange={set("firstName")} error={errors.firstName} />
        <Field label="Soyad" autoComplete="family-name" value={address.lastName} onChange={set("lastName")} error={errors.lastName} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Cep Telefonu"
          type="tel"
          inputMode="tel"
          placeholder="05XX XXX XX XX"
          autoComplete="tel"
          value={address.phone}
          onChange={set("phone")}
          error={errors.phone}
        />
        <Field
          label="E-posta"
          type="email"
          placeholder="ornek@eposta.com"
          autoComplete="email"
          value={address.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="İl" autoComplete="address-level1" value={address.city} onChange={set("city")} error={errors.city} />
        <Field label="İlçe" autoComplete="address-level2" value={address.district} onChange={set("district")} error={errors.district} />
        <Field
          label="Posta Kodu (opsiyonel)"
          inputMode="numeric"
          autoComplete="postal-code"
          value={address.postalCode}
          onChange={set("postalCode")}
        />
      </div>
      <TextareaField
        label="Açık Adres"
        rows={3}
        placeholder="Mahalle, sokak, bina ve daire no"
        autoComplete="street-address"
        value={address.addressLine}
        onChange={set("addressLine")}
      />
      {errors.addressLine && <p className="-mt-3 text-sm text-burgundy-deep">{errors.addressLine}</p>}
      <TextareaField
        label="Sipariş Notu (opsiyonel)"
        rows={2}
        placeholder="Kapıda zile basmayın, hediye notu ekleyin..."
        value={address.note}
        onChange={set("note")}
      />

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Kargo Seçimine Geç <ArrowRight className="size-5" />
      </Button>
    </form>
  );
}
