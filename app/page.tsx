import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import PlatformGrid from "@/components/sections/PlatformGrid";
import LatestEpisodes from "@/components/sections/LatestEpisodes";
import TopicExplorer from "@/components/sections/TopicExplorer";
import BeyondTheMic from "@/components/sections/BeyondTheMic";
import ListenerCarousel from "@/components/sections/ListenerCarousel";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <PlatformGrid />
        <LatestEpisodes />
        <TopicExplorer />
        <BeyondTheMic />
        <ListenerCarousel />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
