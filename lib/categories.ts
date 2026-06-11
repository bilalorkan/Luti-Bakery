import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "cookie",
    name: "Cookie",
    description: "Dışı çıtır, içi akışkan — fırından her sabah taze.",
    image: "/cookies/klasik.jpg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
