import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  childSelector?: string;
  scale?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      if (options.childSelector) {
        gsap.set(el.querySelectorAll(options.childSelector), {
          opacity: 1,
          y: 0,
          x: 0,
        });
      }
      return;
    }

    const {
      y = 30,
      x = 0,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      stagger = 0.12,
      start = "top 80%",
      childSelector,
      scale,
    } = options;

    const targets = childSelector
      ? el.querySelectorAll(childSelector)
      : el;

    const fromVars: gsap.TweenVars = { opacity, y, x };
    if (scale !== undefined) fromVars.scale = scale;

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: childSelector ? stagger : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    };
    if (scale !== undefined) toVars.scale = 1;

    gsap.fromTo(targets, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
