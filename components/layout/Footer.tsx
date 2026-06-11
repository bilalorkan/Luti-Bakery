import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="iletisim" className="relative mt-24 bg-burgundy-deep text-cream">
      <div className="absolute -top-7 inset-x-0 h-7 bg-burgundy-deep scallop-top" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative size-14 overflow-hidden rounded-full">
                <Image
                  src="/brand/luti-logo-cream.jpg"
                  alt="Luti Bakery logosu"
                  fill
                  sizes="56px"
                  className="object-cover scale-[1.12]"
                />
              </span>
              <p className="font-logo text-3xl">Luti Bakery</p>
            </div>
            <p className="mt-4 max-w-sm text-cream/70 leading-relaxed">
              Küçük bir mutfakta, büyük bir sevgiyle. Her sabah taze pişen cookie ve
              brownie&apos;lerimizi Türkiye&apos;nin her yerine gönderiyoruz.
            </p>
            <p className="mt-6 font-hand text-2xl text-blush rotate-[-2deg] inline-block">
              fırından sevgilerle ✷
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Keşfet</h3>
            <ul className="space-y-2 text-cream/70">
              <li><Link href="/products" className="hover:text-blush transition-colors">Ürünlerimiz</Link></li>
              <li><Link href="/about" className="hover:text-blush transition-colors">Hikayemiz</Link></li>
              <li><Link href="/sizden-gelenler" className="hover:text-blush transition-colors">Sizden Gelenler</Link></li>
              <li><Link href="/cart" className="hover:text-blush transition-colors">Sepetim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3 text-cream/70">
              <li className="flex items-center gap-2">
                <AtSign className="size-4 shrink-0" /> @lutibakery
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" /> merhaba@lutibakery.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" /> 0 (212) 000 00 00
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-1" /> İstanbul
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-cream/50">
          <p>© 2026 Luti Bakery. Tüm hakları saklıdır.</p>
          <p>El yapımı, her gün taze.</p>
        </div>
      </div>
    </footer>
  );
}
