const phrases = [
  "Her sabah taze fırından",
  "El yapımı",
  "%70 Belçika çikolatası",
  "Soğuk zincir kargo",
  "Katkısız",
  "Küçük parti üretim",
];

export default function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden bg-burgundy py-3 -rotate-1 scale-105">
      <div className="flex w-max animate-marquee items-center gap-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8" aria-hidden={half === 1}>
            {row.map((phrase, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-8 font-display text-sm sm:text-base font-semibold uppercase tracking-widest text-cream whitespace-nowrap"
              >
                {phrase} <span className="text-butter">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
