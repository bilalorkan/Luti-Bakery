import type { Metadata } from "next";
import { Fraunces, Karla, Caveat } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin", "latin-ext"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
});

const giaza = localFont({
  src: "../public/fonts/GiazaStencil.otf",
  variable: "--font-giaza",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luti Bakery — El Yapımı Cookie & Brownie",
    template: "%s | Luti Bakery",
  },
  description:
    "Her sabah taze pişen el yapımı cookie, brownie ve kekler. Türkiye'nin her yerine soğuk zincir kargo ile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${karla.variable} ${caveat.variable} ${giaza.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
