import type { ShippingMethod } from "@/types";

export const FREE_SHIPPING_THRESHOLD = 600;

export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standart Kargo",
    description: "Soğuk zincir paketleme ile 2-3 iş günü içinde teslim.",
    price: 79,
    eta: "2-3 iş günü",
  },
  {
    id: "express",
    name: "Hızlı Teslimat",
    description: "Ertesi iş günü kapınızda, taptaze.",
    price: 149,
    eta: "1 iş günü",
  },
];
