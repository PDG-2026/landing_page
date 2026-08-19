import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { DownloadSection } from "@/components/DownloadSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <WhySection />
        <ShowcaseSection />
        <DownloadSection />
      </main>
    </>
  );
}
