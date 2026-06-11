import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hikayemiz",
  description: "Luti Bakery'nin küçük bir ev mutfağından başlayan hikayesi.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <p className="font-hand text-2xl text-burgundy rotate-[-1deg] inline-block">hikayemiz</p>
      <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-tight text-cocoa text-balance">
        Bir kavanoz kurabiyeyle başladı her şey
      </h1>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-lift">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=75"
          alt="Luti Bakery mutfağı"
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <div className="prose-luti mt-10 space-y-5 text-lg leading-relaxed text-cocoa/75">
        <p>
          Luti Bakery, evimizin küçük mutfağında, &ldquo;kurabiye kavanozu hiç boş kalmasın&rdquo;
          inadıyla doğdu. Önce komşular, sonra komşuların komşuları derken kendimizi her sabah
          fırının başında bulduk.
        </p>
        <p>
          Bugün hâlâ aynı şekilde çalışıyoruz: küçük partiler, gerçek tereyağı, %70 Belçika
          çikolatası ve acele etmeyen bir fırın. Siparişiniz geldiğinde pişiriyor, aynı gün soğuk
          zincir paketlemeyle yola çıkarıyoruz.
        </p>
        <p>
          Kapınıza gelen kutuyu açtığınızda o ilk günkü mutfağın kokusunu duyuyorsanız, işimizi
          doğru yapmışız demektir.
        </p>
      </div>

      <p className="mt-10 font-hand text-3xl text-caramel-deep rotate-[-2deg]">
        sevgiyle, Luti ✷
      </p>

      <Link href="/products" className="mt-10 inline-block">
        <Button size="lg">
          Vitrine Göz At <ArrowRight className="size-5" />
        </Button>
      </Link>
    </div>
  );
}
