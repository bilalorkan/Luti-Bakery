import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Leaf, Truck } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { formatPrice, formatWeight } from "@/lib/format";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCart from "@/components/product/AddToCart";
import ProductCard from "@/components/product/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-14">
      <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-cocoa/50">
        <Link href="/products" className="hover:text-burgundy transition-colors">
          Cookie&apos;lerimiz
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-cocoa/80 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-butter px-4 py-1 font-hand text-lg text-burgundy -rotate-2">
              {product.badge}
            </span>
          )}
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold leading-tight text-cocoa text-balance">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl font-semibold text-burgundy">
            {formatPrice(product.price)}
            <span className="ml-2 font-sans text-base font-normal text-cocoa/50">
              / {product.unit} · {formatWeight(product.weightGrams)}
            </span>
          </p>

          <p className="mt-6 text-lg text-cocoa/70 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <div className="mt-8 recipe-border rounded-3xl p-5">
            <h2 className="font-display text-lg font-semibold text-cocoa mb-2">Alerjenler</h2>
            <div className="flex flex-wrap gap-2">
              {product.allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="rounded-full bg-butter-light px-3 py-1 text-sm font-semibold capitalize text-cocoa/70"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-cocoa/70">
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-burgundy" /> Siparişiniz geldiği gün pişer, aynı gün
              kargolanır.
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-4 text-burgundy" /> Soğuk zincir paketleme ile 1-3 iş gününde
              teslim.
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="size-4 text-burgundy" /> Katkı maddesi ve koruyucu içermez.
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="font-hand text-2xl text-burgundy">bunlar da fırından yeni çıktı</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa mb-8">
            Benzer Lezzetler
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
