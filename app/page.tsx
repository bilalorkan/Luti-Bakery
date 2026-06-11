import Marquee from "@/components/home/Marquee";
import CookieShowcase from "@/components/home/CookieShowcase";
import StoryStrip from "@/components/home/StoryStrip";

export default function HomePage() {
  return (
    <>
      <CookieShowcase />
      <Marquee />
      <StoryStrip />
    </>
  );
}
