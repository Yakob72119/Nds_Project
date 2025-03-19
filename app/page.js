import "./global.css";

import HeroSection from "./components/HeroSection";
import Announcements from "./components/Announcements";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
     <Navigation />
      <HeroSection />
      <Announcements />
      <Footer />
    </main>
  );
}


