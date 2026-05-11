import { useState, useEffect, useCallback } from "react";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const navLinks = [
  { label: "Inicio", target: "#hero" },
  { label: "Servicios", target: "#services" },
  { label: "Testimonios", target: "#testimonials" },
  { label: "Ubicaciones", target: "#locations" },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback(
    (target: string) => {
      setIsMobileMenuOpen(false);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -64 });
      } else {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenisRef]
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/92 backdrop-blur-xl border-b border-navy/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-1 shrink-0"
          >
            <span className="font-cormorant font-semibold text-xl text-navy tracking-wide">
              Taylor <span className="text-gold">&amp;</span> Cruz
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="font-manrope font-medium text-sm text-navy hover:opacity-60 transition-opacity duration-200 tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors">
              <Search className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors"
            >
              <Menu className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={() => scrollTo("#locations")}
              className="hidden md:inline-flex items-center gap-2 bg-cta-dark text-white font-manrope font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            >
              Contacto
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy/15"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors ml-auto"
            >
              <X className="w-5 h-5 text-navy" />
            </button>
            <nav className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.target)}
                  className="font-manrope font-medium text-lg text-navy text-left hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => scrollTo("#locations")}
              className="mt-8 inline-flex items-center gap-2 bg-cta-dark text-white font-manrope font-semibold text-sm px-6 py-3 rounded-full"
            >
              Contacto
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
