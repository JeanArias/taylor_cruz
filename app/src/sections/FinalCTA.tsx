import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-navy py-20 md:py-24">
      <div className="container-custom max-w-[800px] text-center">
        <h2
          ref={headlineRef}
          className="font-playfair text-[clamp(28px,3.5vw,44px)] text-white leading-[1.2] opacity-0"
        >
          ¿Listo para transformar tu sonrisa?
        </h2>
        <p
          ref={subtextRef}
          className="mt-4 font-manrope text-base text-white/80 leading-[1.7] opacity-0"
        >
          Agenda tu valoración hoy. Nuestro equipo está listo para cuidar de ti.
        </p>

        <div
          ref={buttonsRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/message/ELXYAE7PBGAWP1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-navy font-manrope font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors duration-200 opacity-0"
          >
            Agendar cita
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/message/ELXYAE7PBGAWP1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white font-manrope font-medium text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-200 opacity-0"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
