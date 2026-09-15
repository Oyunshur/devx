import Navbar from "@/components/Navbar";
import HeroHeader from "@/components/HeroHeader";
import Ger3DViewer from "@/components/Ger3DViewer";
import TimelineSection from "@/components/TimelineSection";
import CultureCards from "@/components/CultureCards";
import HistorianMonograph from "@/components/HistorianMonograph";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="site-shell">
      <Navbar />
      <HeroHeader />
      <Ger3DViewer />
      <TimelineSection />
      <CultureCards />
      <HistorianMonograph />
      <Footer />
    </main>
  );
}
