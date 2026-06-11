const tryFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(amount: number): string {
  return tryFormatter.format(amount);
}

export function formatWeight(grams: number): string {
  return grams >= 1000 ? `${(grams / 1000).toLocaleString("tr-TR")} kg` : `${grams} g`;
}
