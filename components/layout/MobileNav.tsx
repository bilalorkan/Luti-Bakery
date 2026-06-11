"use client";

import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  const openDrawer = useCartStore((s) => s.openDrawer);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-y-0 left-0 z-50 w-72 bg-cream shadow-lift p-6 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="font-logo text-2xl text-burgundy">Luti Bakery</span>
              <button onClick={onClose} aria-label="Menüyü kapat" className="p-2 -mr-2 text-cocoa cursor-pointer">
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-xl text-cocoa py-3 border-b border-cocoa/10 hover:text-burgundy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  onClose();
                  openDrawer();
                }}
                className="flex items-center gap-2 font-display text-xl text-cocoa py-3 border-b border-cocoa/10 hover:text-burgundy transition-colors cursor-pointer text-left"
              >
                <ShoppingBag className="size-5" /> Sepetim
              </button>
            </nav>
            <p className="mt-auto font-hand text-xl text-caramel-deep">her sabah taze 🤍</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
