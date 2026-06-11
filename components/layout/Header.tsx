"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import CartButton from "@/components/cart/CartButton";
import MobileNav from "@/components/layout/MobileNav";

const navLinks = [
  { href: "/products", label: "Ürünlerimiz" },
  { href: "/about", label: "Hikayemiz" },
  { href: "/sizden-gelenler", label: "Sizden Gelenler" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 sm:top-5 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full bg-cream/85 backdrop-blur-md shadow-soft ring-1 ring-cocoa/10 py-2 pl-3 pr-2 sm:pl-4">
        <button
          className="lg:hidden p-2 text-cocoa cursor-pointer"
          onClick={() => setMobileOpen(true)}
          aria-label="Menüyü aç"
        >
          <Menu className="size-6" />
        </button>

        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="hidden sm:flex items-center">
            <span className="relative z-10 size-9 sm:size-10 overflow-hidden rounded-full shadow-soft ring-2 ring-cream">
              <Image
                src="/brand/luti-logo-burgundy.jpg"
                alt="Luti Bakery logosu"
                fill
                sizes="40px"
                className="object-cover scale-[1.12]"
              />
            </span>
            <span className="relative -ml-3 size-9 sm:size-10 overflow-hidden rounded-full shadow-soft ring-2 ring-cream">
              <Image
                src="/brand/luti-logo-cream.jpg"
                alt=""
                fill
                sizes="40px"
                className="object-cover scale-[1.12]"
              />
            </span>
          </span>
          <span className="font-logo text-xl sm:text-2xl text-burgundy tracking-tight group-hover:text-burgundy-deep transition-colors whitespace-nowrap">
            Luti Bakery
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold text-cocoa/70 hover:text-burgundy transition-colors whitespace-nowrap",
                pathname === link.href && "text-burgundy"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartButton />
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
