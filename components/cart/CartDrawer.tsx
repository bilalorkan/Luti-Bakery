"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import CartLineItem from "@/components/cart/CartLineItem";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isDrawerOpen, closeDrawer } = useCartStore();
  const subtotal = cartSubtotal(items);
  const freeShippingLeft = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-lift"
            role="dialog"
            aria-label="Sepet"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
              <h2 className="font-display text-2xl font-semibold text-cocoa">Sepetim</h2>
              <button
                onClick={closeDrawer}
                aria-label="Sepeti kapat"
                className="p-2 -mr-2 text-cocoa hover:text-burgundy transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-butter-light">
                  <ShoppingBag className="size-8 text-caramel" />
                </div>
                <p className="font-display text-xl text-cocoa">Sepetiniz henüz boş</p>
                <p className="text-cocoa/60">
                  Fırından yeni çıkanlara bir göz atın — pişman olmazsınız.
                </p>
                <Link href="/products" onClick={closeDrawer}>
                  <Button variant="primary">Ürünlere Göz At</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto divide-y divide-cocoa/10 px-6">
                  {items.map((item) => (
                    <CartLineItem key={item.product.id} item={item} />
                  ))}
                </div>

                <div className="border-t border-cocoa/10 px-6 py-5 space-y-4">
                  {freeShippingLeft > 0 ? (
                    <div className="rounded-2xl bg-butter-light px-4 py-3 text-sm text-cocoa">
                      <span className="font-semibold">{formatPrice(freeShippingLeft)}</span> daha
                      ekleyin, kargo <span className="font-semibold">bedava</span> olsun! 🚚
                      <div className="mt-2 h-1.5 rounded-full bg-cream overflow-hidden">
                        <div
                          className="h-full rounded-full bg-burgundy transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-pistachio/30 px-4 py-3 text-sm font-semibold text-cocoa">
                      🎉 Kargonuz bedava!
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-cocoa/60">Ara toplam</span>
                    <span className="font-display text-xl font-semibold text-cocoa">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      closeDrawer();
                      router.push("/checkout");
                    }}
                  >
                    Siparişi Tamamla
                  </Button>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="block text-center text-sm font-semibold text-cocoa/60 hover:text-burgundy transition-colors"
                  >
                    Sepet sayfasına git
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
