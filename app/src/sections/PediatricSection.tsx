import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PediatricSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text content
      gsap.fromTo(
        textRef.current,
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

      // Image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
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

      // Parallax for decorative shapes
      if (shapesRef.current) {
        gsap.to(shapesRef.current.querySelectorAll(".tooth-shape"), {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-champagne py-20 md:py-28 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div ref={textRef} className="opacity-0">
            <span className="section-label font-manrope font-medium text-xs uppercase tracking-[0.08em] text-accent-blue">
              Odontopediatría
            </span>
            <h2 className="mt-4 font-playfair text-[clamp(28px,3.5vw,44px)] leading-[1.2] text-navy">
              Cuidamos la sonrisa de tus pequeños
            </h2>
            <p className="mt-5 font-manrope text-base text-navy-light leading-[1.7] max-w-[420px]">
              Creamos una experiencia tranquila, amable y positiva para que los
              niños se sientan seguros desde su primera visita.
            </p>
            <a
              href="https://wa.me/message/ELXYAE7PBGAWP1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              Agendar cita infantil
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right - Image with decorative shapes */}
          <div className="relative">
            {/* Decorative tooth shapes */}
            <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
              <div
                className="tooth-shape absolute -top-8 -left-4 w-32 h-32 rounded-full bg-white/20 blur-xl"
                style={{ borderRadius: "60% 40% 50% 50%" }}
              />
              <div
                className="tooth-shape absolute top-1/4 -right-8 w-24 h-24 rounded-full bg-white/15 blur-lg"
                style={{ borderRadius: "50% 50% 40% 60%" }}
              />
              <div
                className="tooth-shape absolute bottom-0 left-1/4 w-28 h-28 rounded-full bg-white/10 blur-xl"
                style={{ borderRadius: "45% 55% 55% 45%" }}
              />
            </div>

            <div
              ref={imageRef}
              className="relative rounded-[32px] overflow-hidden shadow-card opacity-0"
            >
              <img
                src="/assets/pediatric-child.jpg"
                alt="Niño sonriendo felizmente"
                className="w-full h-[400px] md:h-[480px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
