import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Moravia, San José",
    phone: "+506 2297-5591",
    cta: "Contactar Moravia",
  },
  {
    name: "Nicoya, Guanacaste",
    phone: "+506 2685-5746",
    cta: "Contactar Nicoya",
  },
];

export default function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
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
    <section id="locations" ref={sectionRef} className="bg-ivory py-20 md:py-28">
      <div className="container-custom">
        <h2
          ref={headlineRef}
          className="font-playfair text-[clamp(24px,3vw,40px)] text-navy text-center leading-[1.2] opacity-0"
        >
          Agenda tu cita en Moravia o Nicoya
        </h2>

        {/* Location Cards */}
        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto"
        >
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="bg-white rounded-[24px] p-8 md:p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300 opacity-0"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-accent-blue/15 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-blue" />
              </div>

              <h3 className="mt-4 font-manrope font-semibold text-xl text-navy">
                {loc.name}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-blue" />
                <span className="font-manrope text-base text-navy-light">
                  {loc.phone}
                </span>
              </div>

              <a
                href={`https://wa.me/${loc.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-6"
              >
                {loc.cta}
              </a>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div ref={ctaRef} className="mt-12 text-center opacity-0">
          <a
            href="https://wa.me/message/ELXYAE7PBGAWP1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cta-dark text-white font-manrope font-semibold text-base px-8 py-4 rounded-full hover:bg-navy transition-colors duration-200"
          >
            Escríbennos por WhatsApp
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
