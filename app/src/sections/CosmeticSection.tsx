import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CosmeticSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Gold line scale
      gsap.fromTo(
        goldLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Text overlay
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-32">
      <div className="container-custom">
        <div
          ref={imageRef}
          className="relative rounded-[32px] lg:rounded-[40px] overflow-hidden max-w-[1000px] mx-auto opacity-0"
        >
          {/* Image */}
          <img
            src="/assets/cosmetic-smile.jpg"
            alt="Sonrisa perfecta siendo examinada con espejo dental"
            className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(transparent 40%, rgba(15, 47, 87, 0.5) 100%)",
            }}
          />

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Gold accent line */}
              <div
                ref={goldLineRef}
                className="w-[60px] h-px bg-gold mb-4"
                style={{ transformOrigin: "center" }}
              />

              <div ref={textRef} className="opacity-0">
                <h2 className="font-playfair text-[clamp(24px,3vw,40px)] leading-[1.2] text-white drop-shadow-lg">
                  Ilumina tu{" "}
                  <em className="font-italic-emphasis">sonrisa</em> con
                  confianza y cuidado
                </h2>
                <p className="mt-3 font-manrope text-sm md:text-base text-white/90 max-w-[520px] leading-[1.7]">
                  El blanqueamiento dental profesional ayuda a mejorar el tono
                  de tus dientes de forma segura, guiada y personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
