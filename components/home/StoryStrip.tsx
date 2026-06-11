import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, HandHeart, Truck } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Her gün taze",
    text: "Sipariş geldikçe pişiriyoruz; raf bekleyen ürünümüz yok.",
  },
  {
    icon: HandHeart,
    title: "El yapımı",
    text: "Küçük partiler, gerçek tereyağı, bildiğiniz malzemeler.",
  },
  {
    icon: Truck,
    title: "Soğuk zincir kargo",
    text: "Özel paketlemeyle Türkiye'nin her yerine taptaze.",
  },
];

export default function StoryStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 grid items-center gap-12 lg:grid-cols-2">
      <div className="relative order-2 lg:order-1 h-[400px]">
        <div className="absolute left-0 top-0 w-[70%] aspect-[4/5] rotate-[-4deg] overflow-hidden rounded-[2.5rem] shadow-lift">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=75"
            alt="Mutfakta hamur hazırlığı"
            fill
            sizes="(max-width: 1024px) 70vw, 35vw"
            className="object-cover"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-[48%] aspect-square rotate-[5deg] overflow-hidden rounded-[2rem] border-8 border-cream shadow-lift">
          <Image
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=75"
            alt="Vitrindeki taze ürünler"
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
        <p className="absolute -bottom-4 left-8 font-hand text-3xl text-caramel-deep rotate-[-3deg]">
          mutfağımızdan ✷
        </p>
      </div>

      <div className="order-1 lg:order-2">
        <p className="font-hand text-2xl text-burgundy">merhaba, biz Luti</p>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold leading-tight text-cocoa text-balance">
          Küçük bir mutfak, kocaman bir sevgi
        </h2>
        <p className="mt-5 text-lg text-cocoa/70 leading-relaxed">
          Luti Bakery, bir ev mutfağında kurabiye kavanozunu hiç boş bırakmama hayaliyle başladı.
          Bugün hâlâ aynı özenle, küçük partiler halinde pişiriyor ve aynı gün paketleyip yola
          çıkarıyoruz.
        </p>

        <ul className="mt-8 space-y-5">
          {values.map((value) => (
            <li key={value.title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-butter-light text-burgundy">
                <value.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-cocoa">{value.title}</h3>
                <p className="text-cocoa/60">{value.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 font-semibold text-burgundy hover:text-burgundy-deep transition-colors"
        >
          Hikayemizin tamamı
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
