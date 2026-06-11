import type { Metadata } from "next";
import Image from "next/image";
import { AtSign, Star } from "lucide-react";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Sizden Gelenler",
  description: "Luti Bakery müşterilerinin yorumları ve paylaştığı fotoğraflar.",
};

interface Testimonial {
  name: string;
  city: string;
  text: string;
  stars: number;
  image?: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Elif K.",
    city: "İstanbul",
    text: "Black cocoa hayatımda yediğim en iyi cookie. İçindeki karamelize çikolata diskleri efsane, kutu daha açılırken kokusu odayı sardı.",
    stars: 5,
    image: "/cookies/black-cocoa.jpg",
    product: "Black Cocoa Cookie",
  },
  {
    name: "Mert A.",
    city: "Ankara",
    text: "Kargo korkumu yendiniz — soğuk zincirle geldi, sanki fırından yeni çıkmış gibiydi. Klasik cookie tam kıvamında, dışı çıtır içi akışkan.",
    stars: 5,
    product: "Klasik Çikolata Parçacıklı",
  },
  {
    name: "Zeynep T.",
    city: "İzmir",
    text: "Red velvet görünce dayanamadım, fotoğraftakinin aynısı geldi. Üstündeki kurabiyeyle birlikte muazzam bir ikili.",
    stars: 5,
    image: "/cookies/red-velvet.jpg",
    product: "Red Velvet Cookie",
  },
  {
    name: "Can D.",
    city: "Bursa",
    text: "Ofise sipariş verdik, 10 dakikada bitti. Fıstık ezmeli olanı bir dahaki sefere iki katı alacağız, kavga çıkmasın diye.",
    stars: 5,
    product: "Fıstık Ezmeli Cookie",
  },
  {
    name: "Selin Y.",
    city: "İstanbul",
    text: "El yazısı notunuz çok tatlıydı. Hediye olarak gönderdim, arkadaşım bayıldı. Paketleme de ayrı güzel.",
    stars: 5,
  },
  {
    name: "Burak Ö.",
    city: "Eskişehir",
    text: "İnternetten tatlı siparişine hep şüpheyle yaklaşırdım. Luti bu önyargıyı tek kutuda yıktı. Tazelik gerçekten 'her sabah taze' sloganındaki gibi.",
    stars: 5,
    image: "/cookies/klasik.jpg",
    product: "Tadım Siparişi",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} yıldız`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < count ? "fill-caramel text-caramel" : "text-cocoa/20"
          )}
        />
      ))}
    </div>
  );
}

export default function SizdenGelenlerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <div className="mb-12 text-center">
        <p className="font-hand text-2xl text-burgundy rotate-[-1deg] inline-block">
          iyi ki varsınız
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa">
          Sizden Gelenler
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-cocoa/60">
          Kutusunu açan herkesin bir çift sözü var. İşte mutfaktan çıkıp kapınıza ulaşan
          cookie&apos;lerimiz hakkında yazdıklarınız.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:break-inside-avoid">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="mb-6 rounded-[2rem] bg-cream-soft p-6 shadow-soft"
          >
            {t.image && (
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={t.image}
                  alt={t.product ?? "Müşteri fotoğrafı"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <Stars count={t.stars} />
            <p className="mt-3 text-cocoa/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display font-semibold text-cocoa">
                {t.name}
                <span className="ml-2 font-sans text-sm font-normal text-cocoa/50">{t.city}</span>
              </p>
              {t.product && (
                <span className="rounded-full bg-butter-light px-3 py-1 text-xs font-semibold text-cocoa/70">
                  {t.product}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 recipe-border rounded-[2.5rem] p-8 sm:p-12 text-center">
        <p className="font-hand text-3xl text-burgundy rotate-[-2deg] inline-block">sıra sende!</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-cocoa">
          Sen de paylaş
        </h2>
        <p className="mx-auto mt-3 max-w-md text-cocoa/60">
          Cookie&apos;lerinin fotoğrafını çek, bizi etiketle — en güzel kareler bu sayfada yerini
          alsın.
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 font-semibold text-cream">
          <AtSign className="size-5" /> lutibakery
        </p>
      </div>
    </div>
  );
}
