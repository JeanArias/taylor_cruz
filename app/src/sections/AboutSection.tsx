import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 437, prefix: "+", label: "pacientes conectados" },
  { value: 2, prefix: "", label: "sedes en Costa Rica" },
  { value: 4.9, prefix: "", label: "experiencia del paciente", suffix: "" },
  { value: 8, prefix: "+", label: "servicios dentales" },
];

const aboutImages = [
  "/assets/about-img-1.jpg",
  "/assets/about-img-2.jpg",
  "/assets/about-img-3.jpg",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Statement animation
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 80%",
          },
        }
      );

      // Images stagger animation
      if (imagesRef.current) {
        gsap.fromTo(
          imagesRef.current.querySelectorAll(".about-img"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Stat counter animation
      statRefs.current.forEach((statEl, index) => {
        if (!statEl) return;
        const target = stats[index].value;
        const isDecimal = target % 1 !== 0;

        gsap.fromTo(
          statEl,
          { innerText: "0" },
          {
            innerText: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { innerText: isDecimal ? 0.1 : 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
            onUpdate: function () {
              const current = parseFloat(statEl.innerText || "0");
              if (isDecimal) {
                statEl.innerText = current.toFixed(1);
              } else {
                statEl.innerText = Math.round(current).toString();
              }
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-white py-20 md:py-32">
      <div className="container-custom">
        <SectionHeader label="Sobre la clínica" marker="01" />

        {/* Main Statement */}
        <div ref={statementRef} className="mt-10 max-w-[800px] mx-auto text-center opacity-0">
          <p className="font-playfair text-[clamp(24px,3vw,40px)] leading-[1.3] text-navy">
            Creamos relaciones duraderas — basadas en{" "}
            <em className="font-italic-emphasis">confianza y cuidado</em>.
            Nuestro equipo se compromete a que cada visita sea cómoda,
            profesional y pensada para ti.
          </p>
        </div>

        {/* Overlapping Images */}
        <div
          ref={imagesRef}
          className="mt-12 flex items-center justify-center gap-0 relative"
        >
          <div className="flex items-center -space-x-5 md:-space-x-4">
            {aboutImages.map((src, i) => (
              <div
                key={i}
                className={`about-img relative rounded-[20px] overflow-hidden border-4 border-white shadow-card opacity-0 ${
                  i === 0
                    ? "w-[140px] h-[100px] md:w-[160px] md:h-[120px] -translate-y-4"
                    : i === 1
                    ? "w-[160px] h-[120px] md:w-[180px] md:h-[140px] z-10"
                    : "w-[140px] h-[100px] md:w-[160px] md:h-[120px] translate-y-4"
                }`}
              >
                <img
                  src={src}
                  alt={`Clínica dental - imagen ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Arrow Button */}
          <button className="ml-6 md:ml-8 w-12 h-12 rounded-full border border-navy/15 flex items-center justify-center hover:bg-navy/5 hover:border-navy/25 transition-all duration-200 shrink-0">
            <ArrowUpRight className="w-5 h-5 text-navy" />
          </button>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-12 lg:gap-16">
              <div className="text-center">
                <span className="stat-number">
                  {stat.prefix}
                  <span ref={(el) => { statRefs.current[index] = el; }}>0</span>
                  {stat.suffix || (stat.value % 1 !== 0 ? "" : "")}
                </span>
                <p className="mt-1 font-manrope text-[13px] text-navy-light tracking-wide">
                  {stat.label}
                </p>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-navy/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
