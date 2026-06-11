import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Cookie'lerimiz",
  description: "El yapımı 4 imza cookie — her sabah taze pişer, aynı gün kargolanır.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <div className="mb-10">
        <p className="font-hand text-2xl text-burgundy rotate-[-1deg] inline-block">
          hepsi taptaze
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa">
          Cookie&apos;lerimiz
        </h1>
        <p className="mt-3 max-w-xl text-cocoa/60">
          Dört imza lezzetimiz var; hepsi bugün pişti. Beğendiğinizi sepete atın, gerisini biz
          halledelim.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
