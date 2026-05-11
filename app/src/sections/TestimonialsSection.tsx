import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "La mejor experiencia dental que he tenido. El equipo fue profesional, amable y me hizo sentir en confianza desde el primer momento.",
    author: "Paciente Taylor & Cruz Dental",
    rating: 4.9,
    image: "/assets/testimonial-portrait.jpg",
    secondaryImage: "/assets/testimonial-secondary.jpg",
  },
  {
    quote:
      "Mi hijo siempre tuvo miedo al dentista, pero en Taylor & Cruz lo trataron con tanta paciencia que ahora le encanta ir. ¡Increíble!",
    author: "María G. - Madre de familia",
    rating: 5.0,
    image: "/assets/testimonial-portrait.jpg",
    secondaryImage: "/assets/about-img-2.jpg",
  },
  {
    quote:
      "El blanqueamiento superó mis expectativas. Resultados naturales y un equipo que realmente se preocupa por tu bienestar.",
    author: "Carlos R. - Paciente estética dental",
    rating: 4.8,
    image: "/assets/hero-portrait.jpg",
    secondaryImage: "/assets/testimonial-secondary.jpg",
  },
];

export default function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeSlide) return;

      // Animate out
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        onComplete: () => {
          setActiveSlide(index);
          // Animate in
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35 }
          );
        },
      });
    },
    [activeSlide]
  );

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % testimonials.length);
  }, [activeSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeSlide - 1 + testimonials.length) % testimonials.length);
  }, [activeSlide, goToSlide]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
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

  const current = testimonials[activeSlide];
  const fullStars = Math.floor(current.rating);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white py-20 md:py-32"
    >
      <div className="container-custom">
        <SectionHeader label="Testimonios" marker="03" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Images */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              {/* Primary image */}
              <div className="rounded-[32px] overflow-hidden shadow-card">
                <img
                  src={current.image}
                  alt="Paciente satisfecho"
                  className="w-full h-[400px] md:h-[480px] object-cover transition-opacity duration-500"
                  loading="lazy"
                />
              </div>

              {/* Secondary overlapping image */}
              <div className="absolute -bottom-4 -right-4 md:-right-8 w-[140px] md:w-[160px] h-[100px] md:h-[120px] rounded-[20px] overflow-hidden border-4 border-white shadow-card">
                <img
                  src={current.secondaryImage}
                  alt="Experiencia en la clínica"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right - Quote */}
          <div ref={quoteRef} className="lg:pl-8 opacity-0">
            {/* Quote mark */}
            <span className="font-playfair text-5xl text-accent-blue/50 leading-none">
              &mdash;
            </span>

            <blockquote className="mt-4 font-playfair italic text-[clamp(18px,2vw,26px)] text-navy leading-[1.5] max-w-[480px]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <p className="mt-6 font-manrope font-medium text-sm text-navy-light">
              {current.author}
            </p>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-3">
              <span className="font-playfair text-[28px] text-navy">
                {current.rating}
              </span>
              <span className="font-manrope text-sm text-navy-light">/ 5</span>
              <div className="flex gap-0.5 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < fullStars
                        ? "text-gold fill-gold"
                        : "text-navy/10 fill-navy/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={prevSlide}
                className="text-link flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              <span className="font-manrope text-xs text-navy-light">
                (0{activeSlide + 1} / 0{testimonials.length})
              </span>
              <button
                onClick={nextSlide}
                className="text-link flex items-center gap-1"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
