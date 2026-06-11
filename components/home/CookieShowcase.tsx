"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

/* Byredo-style pinned showcase: ilk panel hero, sonra her scroll adımında tek cookie odakta */

interface CookiePanel {
  slug: string;
  word: string; // dev arka plan tipografisi
  bg: string;
  text: string;
  word__: string; // arka plan yazısının rengi
  sub: string;
  dark?: boolean;
}

const INTRO_BG = "#faf3e7"; // cream
const INTRO_TEXT = "#5c3a21"; // cocoa
const INTRO_SUB = "rgba(92, 58, 33, 0.65)";

const cookiePanels: CookiePanel[] = [
  {
    slug: "klasik-cikolata-parcacikli-cookie",
    word: "KLASİK",
    bg: "#f8eed9",
    text: "#5c3a21",
    word__: "rgba(200, 159, 115, 0.35)",
    sub: "rgba(92, 58, 33, 0.65)",
  },
  {
    slug: "black-cocoa-cookie",
    word: "BLACK COCOA",
    bg: "#241812",
    text: "#faf3e7",
    word__: "rgba(250, 243, 231, 0.08)",
    sub: "rgba(250, 243, 231, 0.6)",
    dark: true,
  },
  {
    slug: "red-velvet-cookie",
    word: "RED VELVET",
    bg: "#571e2c",
    text: "#faf3e7",
    word__: "rgba(250, 243, 231, 0.1)",
    sub: "rgba(250, 243, 231, 0.65)",
    dark: true,
  },
  {
    slug: "fistik-ezmeli-cookie",
    word: "FISTIK",
    bg: "#eecfc0",
    text: "#571e2c",
    word__: "rgba(87, 30, 44, 0.12)",
    sub: "rgba(87, 30, 44, 0.65)",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function IntroPanel() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
      <div>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-hand text-2xl sm:text-3xl text-burgundy rotate-[-2deg] inline-block"
        >
          her sabah taze ✷
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] text-cocoa text-balance"
        >
          Fırından
          <br />
          yeni çıktı<span className="text-burgundy">.</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 max-w-md text-base sm:text-lg text-cocoa/70 leading-relaxed"
        >
          Küçük partiler halinde, gerçek tereyağı ve %70 Belçika çikolatasıyla pişiriyoruz.
          Cookie&apos;lerimiz soğuk zincirle, taptaze kapınızda.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center gap-4"
        >
          <Link href="/products">
            <Button size="lg">
              Hemen Sipariş Ver <ArrowRight className="size-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Hikayemiz
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* katmanlı görseller */}
      <div className="relative h-[30vh] min-h-[220px] sm:h-[420px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute left-0 top-2 w-[62%] aspect-[4/5] max-h-full overflow-hidden rounded-[2.5rem] shadow-lift"
        >
          <Image
            src="/cookies/klasik.jpg"
            alt="Klasik çikolata parçacıklı cookie"
            fill
            preload
            sizes="(max-width: 1024px) 70vw, 35vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute right-0 bottom-0 w-[48%] aspect-square overflow-hidden rounded-[2.5rem] border-8 border-cream shadow-lift"
        >
          <Image
            src="/cookies/black-cocoa.jpg"
            alt="Black cocoa cookie"
            fill
            sizes="(max-width: 1024px) 55vw, 28vw"
            className="object-cover"
          />
        </motion.div>

        {/* sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.55 }}
          className="absolute right-[34%] top-0 flex size-20 sm:size-28 -rotate-12 flex-col items-center justify-center rounded-full bg-cocoa text-cream shadow-lift"
        >
          <span className="font-hand text-base sm:text-lg leading-none text-blush">bugün</span>
          <span className="font-display text-xs sm:text-base font-semibold text-center leading-tight">
            taze
            <br />
            pişti!
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function CookieShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const [active, setActive] = useState(0);

  const cookies = cookiePanels
    .map((panel) => ({ panel, product: getProduct(panel.slug) }))
    .filter((x) => x.product);

  const total = cookies.length + 1; // +1 = hero intro paneli

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  const activeTheme =
    active === 0
      ? { bg: INTRO_BG, text: INTRO_TEXT, sub: INTRO_SUB }
      : cookies[active - 1].panel;

  const scrollToPanel = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * window.innerHeight + 8, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      aria-label="Luti Bakery cookie koleksiyonu"
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: activeTheme.bg }}
      >
        {/* Panel 0 — hero */}
        <motion.article
          initial={false}
          animate={{
            opacity: active === 0 ? 1 : 0,
            scale: active === 0 ? 1 : 0.95,
            y: active === 0 ? 0 : -30,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute inset-0 flex items-center",
            active !== 0 && "pointer-events-none"
          )}
          aria-hidden={active !== 0}
        >
          {/* yumuşak lekeler */}
          <div className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-butter/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 size-[420px] rounded-full bg-blush/50 blur-3xl" />
          <IntroPanel />
        </motion.article>

        {/* Cookie panelleri */}
        {cookies.map(({ panel, product }, i) => {
          const index = i + 1;
          const isActive = index === active;
          return (
            <motion.article
              key={panel.slug}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.95,
                y: isActive ? 0 : 30,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center px-4",
                !isActive && "pointer-events-none"
              )}
              aria-hidden={!isActive}
            >
              {/* dev arka plan tipografisi */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-center font-display font-semibold uppercase leading-none tracking-tight text-[19vw] sm:text-[15vw] select-none"
                style={{ color: panel.word__ }}
              >
                {panel.word}
              </span>

              {/* ürün görseli */}
              <motion.div
                animate={isActive ? { y: [0, -10, 0] } : { y: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-[min(44vh,78vw)] overflow-hidden rounded-full shadow-lift"
              >
                <Image
                  src={product!.images[0]}
                  alt={product!.name}
                  fill
                  sizes="(max-width: 640px) 78vw, 44vh"
                  className="object-cover"
                />
              </motion.div>

              {/* metin + CTA */}
              <div className="relative mt-8 text-center max-w-xl">
                <p className="font-hand text-2xl" style={{ color: panel.sub }}>
                  {String(index).padStart(2, "0")} / {String(cookies.length).padStart(2, "0")}
                </p>
                <h3
                  className="mt-1 font-display text-3xl sm:text-5xl font-semibold text-balance"
                  style={{ color: panel.text }}
                >
                  {product!.name}
                </h3>
                <p className="mt-3 text-base sm:text-lg" style={{ color: panel.sub }}>
                  {product!.shortDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => addItem(product!)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-all duration-200 cursor-pointer shadow-soft hover:shadow-lift hover:-translate-y-0.5",
                      panel.dark
                        ? "bg-cream text-burgundy hover:bg-butter"
                        : "bg-burgundy text-cream hover:bg-burgundy-deep"
                    )}
                  >
                    <ShoppingBag className="size-5" />
                    Sepete Ekle — {formatPrice(product!.price)}
                  </button>
                  <Link
                    href={`/products/${product!.slug}`}
                    className="group inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-70"
                    style={{ color: panel.text }}
                  >
                    İncele
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}

        {/* sağ kenar nokta navigasyonu */}
        <nav
          aria-label="Bölümler arasında geçiş"
          className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
        >
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToPanel(i)}
              aria-label={i === 0 ? "Başlangıç" : cookies[i - 1].product!.name}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer",
                i === active ? "h-7 w-2.5" : "size-2.5 opacity-40 hover:opacity-80"
              )}
              style={{ backgroundColor: activeTheme.text }}
            />
          ))}
        </nav>

        {/* scroll ipucu */}
        <p
          className="absolute bottom-5 inset-x-0 text-center font-hand text-xl animate-bounce"
          style={{ color: activeTheme.sub }}
        >
          kaydırmaya devam ↓
        </p>
      </motion.div>
    </section>
  );
}
