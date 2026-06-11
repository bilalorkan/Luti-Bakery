import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "klasik-cikolata-parcacikli-cookie",
    name: "Klasik Çikolata Parçacıklı Cookie",
    category: "cookie",
    price: 85,
    unit: "adet",
    weightGrams: 110,
    images: ["/cookies/klasik.jpg"],
    shortDescription: "Üç çeşit çikolata, esmer şekerli hamur.",
    description:
      "İmza ürünümüz. Esmer şekerli hamur, bitter ve sütlü çikolata damlaları, üzerine bir tutam deniz tuzu. Dışı çıtır, içi akışkan — fırından çıktığı gün kapınızda.",
    allergens: ["gluten", "süt", "yumurta"],
    featured: true,
    badge: "Çok satan",
  },
  {
    id: "p2",
    slug: "black-cocoa-cookie",
    name: "Black Cocoa Cookie",
    category: "cookie",
    price: 95,
    unit: "adet",
    weightGrams: 115,
    images: ["/cookies/black-cocoa.jpg", "/cookies/karamel-tray.jpg"],
    shortDescription: "Simsiyah kakao, karamelize beyaz çikolata.",
    description:
      "Yoğun black cocoa hamuru, içinde eriyen karamelize beyaz çikolata diskleri. Az tatlı, bol kakaolu — çikolatanın karanlık tarafını sevenlere.",
    allergens: ["gluten", "süt", "yumurta"],
    featured: true,
    badge: "Yeni",
  },
  {
    id: "p3",
    slug: "red-velvet-cookie",
    name: "Red Velvet Cookie",
    category: "cookie",
    price: 90,
    unit: "adet",
    weightGrams: 110,
    images: ["/cookies/red-velvet.jpg"],
    shortDescription: "Kadife dokulu, beyaz çikolatalı, üstü kurabiyeli.",
    description:
      "Kadife dokulu red velvet hamuru, beyaz çikolata parçaları ve tepesinde kakaolu kurabiye. Göz alıcı, bir o kadar da lezzetli.",
    allergens: ["gluten", "süt", "yumurta"],
    featured: true,
  },
  {
    id: "p4",
    slug: "fistik-ezmeli-cookie",
    name: "Fıstık Ezmeli Cookie",
    category: "cookie",
    price: 95,
    unit: "adet",
    weightGrams: 115,
    images: ["/cookies/karamel.jpg"],
    shortDescription: "Yer fıstığı ezmesi dolgulu, üstü karamelize.",
    description:
      "Yoğun yer fıstığı ezmesiyle doldurulmuş, üstü hafif karamelize cookie. Fıstık severlere: bu sizin için.",
    allergens: ["gluten", "süt", "yumurta", "fıstık"],
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}
