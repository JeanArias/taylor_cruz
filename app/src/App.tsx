import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import PediatricSection from "@/sections/PediatricSection";
import CosmeticSection from "@/sections/CosmeticSection";
import TechnologySection from "@/sections/TechnologySection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import LocationsSection from "@/sections/LocationsSection";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <div className="relative">
      <Navigation lenisRef={lenisRef as React.MutableRefObject<any>} />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PediatricSection />
        <CosmeticSection />
        <TechnologySection />
        <TestimonialsSection />
        <LocationsSection />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
