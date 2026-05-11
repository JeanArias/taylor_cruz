import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        pillRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ivory py-20 md:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="opacity-0">
            <div className="rounded-[32px] overflow-hidden shadow-card">
              <img
                src="/assets/tech-3d-tooth.jpg"
                alt="Modelo 3D de diente - tecnología dental moderna"
                className="w-full h-[350px] md:h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div ref={textRef} className="opacity-0">
            <h2 className="font-playfair text-[clamp(28px,3.5vw,40px)] leading-[1.2] text-navy">
              Tecnología moderna para cuidar cada detalle
            </h2>
            <p className="mt-4 font-manrope text-base text-navy-light leading-[1.7] max-w-[440px]">
              Con herramientas actuales y un enfoque preventivo, diagnosticamos
              y tratamos tu sonrisa con precisión, comodidad y confianza.
            </p>

            {/* Search-style pill */}
            <div
              ref={pillRef}
              className="mt-8 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3.5 shadow-card hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300 cursor-pointer opacity-0"
            >
              <span className="font-manrope text-sm text-navy-light">
                ¿Necesitas una valoración?
              </span>
              <Search className="w-[18px] h-[18px] text-accent-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
