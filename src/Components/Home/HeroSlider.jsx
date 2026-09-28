import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
const HeroImageScene = lazy(() => import("../3d/HeroImageScene"));

const slides = [
  {
    id: 1,
    eyebrow: "NEW SEASON",
    title: "Elegance Designed for Every Woman.",
    description:
      "Discover the latest Latasha collection, created for confidence, comfort and effortless style.",
    image: "/lady%201.jpg",
  },
  {
    id: 2,
    eyebrow: "THE LATASHA EDIT",
    title: "Style That Speaks Without Saying a Word.",
    description:
      "Statement pieces, refined silhouettes and timeless details designed for the modern woman.",
    image: "/lady2.jpg",
  },
  {
    id: 3,
    eyebrow: "NEW ARRIVALS",
    title: "Your Style. Your Confidence. Your Latasha.",
    description:
      "Explore fresh silhouettes and effortless pieces made to become part of your signature style.",
    image: "/lady3.jpg",
  },
  {
    id: 4,
    eyebrow: "G-SHOCK EDIT",
    title: "Built for Every Moment.",
    description:
      "Make a bold statement with the latest G-Shock styles, built for life on the move.",
    image: "/g-shock.jpg",
  },
];

export default function HeroSlider() {
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRefs = useRef([]);

  useLayoutEffect(() => {
    const slide = slideRefs.current[currentSlide];
    if (!slide) return undefined;

    const context = gsap.context(() => {
      const image = slide.querySelector(".hero-slide-image");
      const items = slide.querySelectorAll(".hero-slide-item");
      const headingText = slide.querySelector(".hero-typewriter");
      const timeline = gsap.timeline();

      if (reduceMotion) {
        gsap.set([image, items], { clearProps: "all" });
        if (headingText) headingText.textContent = headingText.dataset.fullText;
        return;
      }

      const fullHeading = headingText?.dataset.fullText ?? "";
      if (headingText) headingText.textContent = "";
      const typingProgress = { value: 0 };

      timeline
        .fromTo(image, { scale: 1.04 }, { scale: 1, duration: 0.9, ease: "power2.out" })
        .fromTo(items, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
        }, 0.16)
        .to(typingProgress, {
          value: 1,
          duration: Math.min(Math.max(fullHeading.length * 0.035, 0.9), 2.2),
          ease: "none",
          onUpdate: () => {
            if (headingText) {
              headingText.textContent = fullHeading.slice(
                0,
                Math.round(typingProgress.value * fullHeading.length),
              );
            }
          },
        }, 0.2);
    }, slide);

    return () => context.revert();
  }, [currentSlide, reduceMotion]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, reduceMotion, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select"));

      if (isEditing || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousSlide();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [nextSlide, previousSlide]);

  return (
    <section
      className="relative h-[calc(100vh-112px)] min-h-[600px] w-full overflow-hidden bg-charcoal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
        {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(element) => { slideRefs.current[index] = element; }}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"}`}
          aria-hidden={index !== currentSlide}
          inert={index !== currentSlide}
        >
          <img
            src={slide.image}
            alt=""
            aria-hidden="true"
            className="hero-slide-image absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Desktop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:hidden" />

          <Suspense fallback={null}>
            <HeroImageScene />
          </Suspense>

          {/* Content */}
          <div className="absolute inset-0 z-10">
            <div className="mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-12 xl:px-16">
              <div
                data-hero-content
                className="hero-slide-content max-w-3xl text-white"
              >
                
                {/* Eyebrow */}
                <div className="hero-slide-item mb-5 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold" />

                  <p className="text-xs font-semibold tracking-[0.35em] text-gold sm:text-sm">
                    {slide.eyebrow}
                  </p>
                </div>

                {/* Heading */}
                <h1
                  aria-label={slide.title}
                  className="hero-slide-item font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span
                    aria-hidden="true"
                    className="hero-typewriter"
                    data-full-text={slide.title}
                  >
                    {slide.title}
                  </span>
                </h1>

                {/* Description */}
                <p className="hero-slide-item mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                {/* CTA */}
                <div className="hero-slide-item mt-8 flex flex-col gap-3 sm:flex-row">
                  
                  <Link
                    to="/shop"
                    className="group inline-flex items-center justify-center gap-4 bg-burgundy px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-burgundy-dark"
                  >
                    Shop Now

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    to="/collections"
                    className="inline-flex items-center justify-center border border-white/70 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-charcoal"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
      ))}

      {/* Bottom Controls */}
      <div className="absolute bottom-7 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12 xl:px-16">

          {/* Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
                className="group p-1"
              >
                <span
                  className={`block h-[2px] transition-all duration-500 ${
                    index === currentSlide
                      ? "w-14 bg-white"
                      : "w-7 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Counter + Arrows */}
          <div className="flex items-center gap-5 text-white">
            
            <div className="hidden text-xs tracking-[0.2em] sm:block">
              <span className="font-semibold">
                {String(currentSlide + 1).padStart(2, "0")}
              </span>

              <span className="mx-2 text-white/40">/</span>

              <span className="text-white/50">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={previousSlide}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center border border-white/50 bg-black/10 text-lg backdrop-blur-sm transition hover:bg-white hover:text-charcoal"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center border border-white/50 bg-black/10 text-lg backdrop-blur-sm transition hover:bg-white hover:text-charcoal"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex">
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll
        </span>

        <span className="h-8 w-px bg-white/40" />
      </div>
    </section>
  );
}
