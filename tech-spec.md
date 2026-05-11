# Taylor & Cruz Dental — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | React DOM renderer |
| `typescript` | ~5.7 | Type safety |
| `vite` | ^6.0 | Build tool |
| `@tailwindcss/vite` | ^4.0 | Tailwind CSS Vite integration |
| `tailwindcss` | ^4.0 | Utility-first CSS |
| `gsap` | ^3.12 | Animation engine (ScrollTrigger included) |
| `lenis` | ^1.2 | Smooth scroll with inertia |
| `lucide-react` | ^0.469 | Icon library |
| `@fontsource/playfair-display` | ^5.0 | Serif font (self-hosted) |
| `@fontsource/cormorant-garamond` | ^600 | Logo serif font (self-hosted) |
| `@fontsource/manrope` | ^5.0 | Sans-serif font (self-hosted) |

GSAP plugins used (all free, bundled with `gsap` package since 2025): ScrollTrigger.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| **Navigation** | Custom | Shared | Sticky header with glassmorphism on scroll. Contains logo, nav links, icons, CTA pill. Mobile: slide-in drawer. |
| **Footer** | Custom | Shared | 4-column footer with soft blue tint. Staggered fade-in on scroll. |
| **FloatingWhatsApp** | Custom | Shared | Fixed-position circle button, persistent across all sections. Pulse animation. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroSection** | Custom | Split 50/50 layout. Left: headline (italic emphasis), subheadline, CTAs, trust highlights. Right: rounded portrait image with floating glassmorphism card. Complex entrance timeline. |
| **AboutSection** | Custom | Centered editorial statement, overlapping images row with arrow button, 4-stat counter row. Number count-up animation. |
| **ServicesSection** | Custom | 3-column layout: numbered list, large image, info card with team avatars. Section marker (02). |
| **PediatricSection** | Custom | Champagne beige bg. 2-column: text + child portrait. Decorative SVG tooth shapes with parallax. |
| **CosmeticSection** | Custom | Full-width rounded image with gradient overlay, centered text overlay with gold accent line. |
| **TechnologySection** | Custom | 2-column: 3D tooth image + text with search-style pill CTA. |
| **TestimonialsSection** | Custom | 2-column: overlapping images + quote. Rating stars, carousel navigation. Optional auto-advance. |
| **LocationsSection** | Custom | Centered headline, 2 location cards (Moravia/Nicoya), prominent WhatsApp CTA. |
| **FinalCTASection** | Custom | Dark navy background. Centered headline, subtext, dual CTAs. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| **SectionHeader** | Custom | About, Services, Testimonials | Label (accent blue, uppercase) + numeric marker (e.g., `(01)`), flex row. |
| **PrimaryButton** | Custom | All sections | Dark pill button with ArrowUpRight icon. Hover: scale + opacity. |
| **SecondaryButton** | Custom | Hero, Locations | Bordered pill button. Hover: background fill. |
| **GlassmorphismCard** | Custom | Hero | Frosted glass card with backdrop-blur, for overlaying images. |
| **GoldAccentLine** | Custom | Cosmetic, decorative | 1px gradient gold line, used as section divider accent. |
| **StatCounter** | Custom | About | Animated number with label. GSAP count-up from 0. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scrolling | Lenis | Global instance, `lerp: 0.1`, synced with ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` | Medium |
| Nav glassmorphism on scroll | GSAP ScrollTrigger | ScrollTrigger toggles class at 50px threshold. CSS handles transition. | Low |
| Hero entrance timeline | GSAP | Single `gsap.timeline()` with sequenced tweens: headline → subheadline → CTAs → image → floating card → trust highlights. Delays 0.2s–1s. `power3.out` easing. | **High** |
| Scroll-reveal (global pattern) | GSAP ScrollTrigger | Reusable hook `useScrollReveal`. Batch pattern for multiple elements. `start: "top 80%"`, `opacity: 0→1`, `y: 30→0`, stagger `0.12s`. | Medium |
| About number count-up | GSAP ScrollTrigger | `gsap.to()` with `snap` on `textContent`. Triggered once on scroll into view. Duration 1.5s, `power2.out`. | Medium |
| About images stagger | GSAP ScrollTrigger | `stagger: 0.15s`, `x: -20→0`, `opacity: 0→1` | Low |
| Service list stagger | GSAP ScrollTrigger | `stagger: 0.08s`, `x: -20→0` | Low |
| Pediatric parallax shapes | GSAP ScrollTrigger | `scrub: true`, decorative SVGs at `y` offset. Moves at 0.5x scroll rate. | Medium |
| Cosmetic gold line scale | GSAP ScrollTrigger | `scaleX: 0→1`, `transformOrigin: "center"`, triggered on scroll. | Low |
| Testimonial cross-fade | GSAP | `opacity` + `y` tween on slide change. Duration 0.5s. Optional auto-advance timer (6s). | Medium |
| Location cards stagger | GSAP ScrollTrigger | `stagger: 0.15s`, `y: 40→0` | Low |
| Footer stagger reveal | GSAP ScrollTrigger | `stagger: 0.1s` on footer columns. | Low |
| WhatsApp button pulse | CSS | `@keyframes` pulse: `scale(1→1.05→1)`, 3s infinite. Pure CSS, no JS. | Low |
| Button/card hover states | CSS | `transition: all 0.2s/0.3s ease`. Transform + box-shadow changes. No JS. | Low |
| Mobile drawer | CSS + React state | Slide-in with `transform: translateX`, backdrop with `opacity`. CSS transition. | Low |
| Reduced motion check | CSS + GSAP | Wrap GSAP calls in `prefers-reduced-motion` check. CSS transitions disabled. | Low |

---

## State & Logic

This is a single-page marketing site. No external state management library is needed — all state is local to components.

### React State (useState)

| Component | State | Purpose |
|-----------|-------|---------|
| Navigation | `isScrolled` (boolean) | Toggles glassmorphism background + border on scroll. Set via ScrollTrigger or scroll listener. |
| Navigation | `isMobileMenuOpen` (boolean) | Toggles mobile slide-in drawer. |
| TestimonialsSection | `activeSlide` (number) | Current testimonial index (0–4). Drives content swap + nav counter. |
| TestimonialsSection | `isAutoPlaying` (boolean, optional) | Controls 6s auto-advance timer. Reset on manual nav click. |

### Refs (useRef)

| Component | Ref | Purpose |
|-----------|-----|---------|
| Navigation | `navRef` | ScrollTrigger trigger element for glassmorphism toggle. |
| HeroSection | `heroTimeline` | Holds the GSAP entrance timeline for cleanup on unmount. |
| AboutSection | `statRefs` (array) | References to each stat number element for count-up animation targets. |
| Multiple sections | `sectionRef` | Each section's root element, passed to `useScrollReveal` hook. |

### Global Instances (module-level)

| Instance | Purpose |
|----------|---------|
| `lenis` (Lenis) | Global smooth scroll, created once in App/Layout, shared across all sections. Provides `scrollTo()` for nav anchor clicks. |

### Logic Flows

**Nav scroll detection:**
Lenis scroll callback → check scroll position > 50px → set `isScrolled` → CSS class toggles background/border styles.

**Scroll-to-section:**
Nav link click → `lenis.scrollTo(targetId, { offset: -64 })` → smooth scroll to section accounting for sticky header height.

**Testimonial carousel:**
- Manual: Click Prev/Next → increment/decrement `activeSlide` (with wrap-around) → GSAP cross-fade content
- Auto: `setInterval` 6s → advance slide → reset interval on manual interaction
- Nav counter displays `(0{activeSlide+1} / 05)` format

**Stat counter trigger:**
ScrollTrigger `onEnter` (once) → GSAP tween on each stat ref's `textContent` from 0 to target value, with `snap: 1` for integers.

---

## Other Key Decisions

**Font delivery:** Self-hosted via `@fontsource/*` packages instead of Google Fonts `<link>`. Eliminates external request, avoids FOUT issues, works offline.

**Image strategy:** Static assets in `public/assets/` directory. WebP format with explicit width/height attributes to prevent CLS. Hero image gets `fetchpriority="high"` and `loading="eager"`. All others `loading="lazy"`.

**No shadcn/ui components:** This design is fully custom with no standard UI patterns (forms, dialogs, tables, etc.). All components are bespoke. shadcn/ui would add unnecessary overhead.

**GSAP registration:** Register ScrollTrigger plugin once at app entry: `gsap.registerPlugin(ScrollTrigger)`. All subsequent components use the registered plugin without re-registering.

**Tailwind config:** Extend theme with design tokens (colors, fonts, spacing) via `@theme` directive in CSS. No separate `tailwind.config.js` needed with Tailwind v4.
