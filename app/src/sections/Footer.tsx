import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const generalLinks = ["Inicio", "Sobre nosotros", "Servicios", "Testimonios"];
const serviceLinks = [
  "Ortodoncia",
  "Estética dental",
  "Implantes",
  "Odontopediatría",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current!.querySelectorAll(".footer-col"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (label: string) => {
    const map: Record<string, string> = {
      Inicio: "#hero",
      "Sobre nosotros": "#about",
      Servicios: "#services",
      Testimonios: "#testimonials",
    };
    const target = map[label];
    if (target) {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="py-16 md:py-20"
      style={{ backgroundColor: "rgba(143, 199, 214, 0.12)" }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Brand */}
          <div className="footer-col opacity-0">
            <span className="font-cormorant font-semibold text-xl text-navy tracking-wide">
              Taylor <span className="text-gold">&amp;</span> Cruz
            </span>
            <p className="mt-1 font-manrope text-sm text-navy-light">
              Dental
            </p>
            <p className="mt-4 font-playfair text-lg text-navy leading-[1.4]">
              Ilumina tu{" "}
              <em className="font-italic-emphasis">sonrisa</em> con confianza y
              cuidado
            </p>
          </div>

          {/* Column 2 - General */}
          <div className="footer-col opacity-0">
            <h4 className="font-manrope font-semibold text-sm text-navy uppercase tracking-wide mb-4">
              General
            </h4>
            <ul className="space-y-3">
              {generalLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="font-manrope text-sm text-navy-light hover:text-navy transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="footer-col opacity-0">
            <h4 className="font-manrope font-semibold text-sm text-navy uppercase tracking-wide mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="font-manrope text-sm text-navy-light">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="footer-col opacity-0">
            <h4 className="font-manrope font-semibold text-sm text-navy uppercase tracking-wide mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="font-manrope text-sm text-navy-light">
                Moravia: +506 2297-5591
              </li>
              <li className="font-manrope text-sm text-navy-light">
                Nicoya: +506 2685-5746
              </li>
              <li>
                <a
                  href="https://instagram.com/taylorycruzdental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-sm text-navy-light hover:text-navy transition-colors duration-200"
                >
                  @taylorycruzdental
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-xs text-navy-light">
            &copy; 2026 Taylor &amp; Cruz Dental
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/taylorycruzdental"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-champagne transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 text-navy" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
