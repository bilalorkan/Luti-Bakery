"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CookingPot } from "lucide-react";
import type { Address, ShippingMethod } from "@/types";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { shippingMethods, FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import Stepper from "@/components/checkout/Stepper";
import AddressForm from "@/components/checkout/AddressForm";
import ShippingMethodPicker from "@/components/checkout/ShippingMethodPicker";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Button from "@/components/ui/Button";

type Step = 0 | 1 | 2 | 3;

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [address, setAddress] = useState<Address | undefined>();
  const [shipping, setShipping] = useState<ShippingMethod>(shippingMethods[0]);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Mock submit — backend fazında gerçek sipariş API'sine bağlanacak
  const placeOrder = () => {
    setSubmitting(true);
    setTimeout(() => {
      setOrderNumber(`LUTI-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(3);
      clearCart();
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  if (!mounted) return <div className="mx-auto max-w-5xl px-4 py-24" />;

  // Success screen
  if (step === 3 && orderNumber) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto flex size-24 items-center justify-center rounded-full bg-pistachio/40"
        >
          <CheckCircle2 className="size-12 text-cocoa" />
        </motion.div>
        <p className="mt-6 font-hand text-3xl text-burgundy rotate-[-2deg]">teşekkürler!</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-cocoa">
          Siparişiniz alındı
        </h1>
        <p className="mt-4 text-lg text-cocoa/70">
          Sipariş numaranız{" "}
          <span className="font-bold text-cocoa">{orderNumber}</span>. Fırın önlüğümüzü taktık,
          ürünleriniz tazecik pişip yola çıkacak. 🍪
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/products">
            <Button size="lg">Alışverişe Devam Et</Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">Ana Sayfa</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 pt-32 pb-24 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-butter-light">
          <CookingPot className="size-8 text-caramel" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-cocoa">
          Sepetinizde ürün yok
        </h1>
        <p className="mt-3 text-cocoa/60">Önce vitrinden bir şeyler seçin, sonra burada buluşalım.</p>
        <Link href="/products" className="mt-6 inline-block">
          <Button size="lg">Ürünlere Göz At</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <h1 className="text-center font-display text-4xl sm:text-5xl font-semibold text-cocoa mb-8">
        Sipariş
      </h1>
      <Stepper current={step} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px] items-start">
        <div className="rounded-[2rem] bg-cream-soft p-6 sm:p-8 shadow-soft">
          {step === 0 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-cocoa mb-6">
                Teslimat Adresi
              </h2>
              <AddressForm
                initial={address}
                onSubmit={(a) => {
                  setAddress(a);
                  setStep(1);
                }}
              />
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-cocoa mb-6">
                Kargo Seçimi
              </h2>
              <ShippingMethodPicker
                selected={shipping}
                freeShipping={freeShipping}
                onSelect={setShipping}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-cocoa mb-6">Ödeme</h2>
              <PaymentForm
                submitting={submitting}
                onBack={() => setStep(1)}
                onSubmit={placeOrder}
              />
            </>
          )}
        </div>

        <OrderSummary items={items} shipping={step >= 1 ? shipping : null} />
      </div>
    </div>
  );
}
