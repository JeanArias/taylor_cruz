import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", name: "Ortodoncia" },
  { num: "02", name: "Odontología estética" },
  { num: "03", name: "Restauración dental" },
  { num: "04", name: "Odontopediatría" },
  { num: "05", name: "Implantes" },
  { num: "06", name: "Endodoncia" },
];

const teamAvatars = [
  "/assets/team-avatar-1.jpg",
  "/assets/team-avatar-2.jpg",
  "/assets/team-avatar-3.jpg",
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Service list stagger
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll(".service-item"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Center image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Info card
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-ivory py-20 md:py-32">
      <div className="container-custom">
        <SectionHeader label="Nuestros Servicios" marker="02" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Left - Service List */}
          <div ref={listRef} className="lg:col-span-3">
            <div className="space-y-0">
              {services.map((service) => (
                <div
                  key={service.num}
                  className="service-item flex items-center gap-4 py-4 border-b border-navy/5 opacity-0 hover:bg-navy/[0.02] transition-colors duration-200 cursor-pointer group"
                >
                  <span className="font-manrope font-medium text-[11px] text-accent-blue tracking-wide">
                    {service.num}
                  </span>
                  <span className="font-manrope font-medium text-base text-navy group-hover:text-navy transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Image */}
          <div ref={imageRef} className="lg:col-span-5 opacity-0">
            <div className="rounded-[32px] overflow-hidden shadow-card">
              <img
                src="/assets/services-main.jpg"
                alt="Dentista atendiendo paciente en clínica moderna"
                className="w-full h-[400px] md:h-[480px] lg:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Info Card */}
          <div ref={cardRef} className="lg:col-span-4 opacity-0">
            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-card h-full flex flex-col justify-center">
              <h3 className="font-playfair text-2xl text-navy leading-[1.3]">
                Una sonrisa segura cambia todo.
              </h3>
              <p className="mt-4 font-manrope text-sm text-navy-light leading-[1.7]">
                En Taylor &amp; Cruz Dental cuidamos tu salud oral con
                tratamientos personalizados que realzan tu sonrisa mientras
                preservan su belleza natural y funcionalidad.
              </p>

              {/* Team Avatars */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {teamAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Miembro del equipo ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <span className="font-manrope text-xs text-navy-light">
                  Nuestro equipo dental
                </span>
              </div>

              <button className="btn-primary mt-6 w-fit">
                Leer más
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
