import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const trustItems = ["Ortodoncia", "Estética Dental", "Implantes", "Odontopediatría"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        floatingCardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        trustRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen bg-ivory pt-16 flex items-center"
    >
      <div className="container-custom w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1 max-w-[520px]">
            <h1
              ref={headlineRef}
              className="font-playfair text-[clamp(36px,5vw,64px)] leading-[1.15] text-navy opacity-0"
            >
              Cuidamos tu
              <br />
              <em className="font-italic-emphasis">Sonrisa</em>, una visita
              <br />
              a la vez.
            </h1>

            <p
              ref={subheadRef}
              className="mt-5 font-manrope text-base text-navy-light leading-[1.7] max-w-[420px] opacity-0"
            >
              Tu sonrisa refleja confianza, salud y bienestar. En Taylor &amp;
              Cruz Dental combinamos tecnología moderna, atención cercana y
              estética dental para cuidar cada detalle.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4 opacity-0">
              <a
                href="https://wa.me/message/ELXYAE7PBGAWP1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Agendar cita
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  const el = document.querySelector("#services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-link"
              >
                Ver servicios
              </button>
            </div>

            <div
              ref={trustRef}
              className="mt-12 flex flex-wrap gap-6 md:gap-8"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 opacity-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="font-manrope text-[13px] text-navy-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-hero opacity-0"
            >
              <img
                src="/assets/hero-portrait.jpg"
                alt="Paciente sonriendo con confianza en Taylor & Cruz Dental"
                className="w-full h-[400px] md:h-[500px] lg:h-[580px] object-cover"
                loading="eager"
              />
            </div>

            {/* Floating Glass Card */}
            <div
              ref={floatingCardRef}
              className="glass-card absolute bottom-6 left-6 p-5 w-[200px] opacity-0"
            >
              <p className="font-cormorant font-semibold text-sm text-navy tracking-wide">
                Taylor &amp; Cruz Care
              </p>
              <ul className="mt-3 space-y-2">
                {["Estética dental", "Ortodoncia", "Tecnología moderna"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-manrope text-xs text-navy-light"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-blue shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
