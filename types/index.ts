export type CategorySlug = "cookie";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export type Allergen = "gluten" | "süt" | "yumurta" | "fındık" | "fıstık" | "ceviz";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number; // TRY
  unit: string; // "adet" | "dilim" | "kutu"
  weightGrams: number;
  images: string[];
  shortDescription: string;
  description: string;
  allergens: Allergen[];
  featured?: boolean;
  badge?: string; // "Çok satan", "Yeni" ...
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  addressLine: string;
  postalCode: string;
  note?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  eta: string;
}
