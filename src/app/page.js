import Hero from "@/components/Hero";
import Content from "@/components/home/Content";
import OurStory from "@/components/home/OurStory";
import Popular from "@/components/home/Popular";
import HomeContactCta from "@/components/HomeContactCta";
import LocationSection from "@/components/LocationSection";
import Process from "@/components/Process";

export default function Home() {
  return (
    <>
      <Hero />
      <Content />
      <Popular />
      <OurStory />
      <Process />
      <LocationSection />
      <HomeContactCta />
    </>
  );
}
