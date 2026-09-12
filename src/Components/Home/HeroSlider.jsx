import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    eyebrow: "NEW SEASON",
    title: "Elegance Designed for Every Woman.",
    description:
      "Discover the latest Latasha collection, created for confidence, comfort and effortless style.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    eyebrow: "THE LATASHA EDIT",
    title: "Style That Speaks Without Saying a Word.",
    description:
      "Statement pieces, refined silhouettes and timeless details designed for the modern woman.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    eyebrow: "NEW ARRIVALS",
    title: "Your Style. Your Confidence. Your Latasha.",
    description:
      "Explore fresh silhouettes and effortless pieces made to become part of your signature style.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

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
          className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
            index === currentSlide
              ? "visible scale-100 opacity-100"
              : "invisible scale-[1.04] opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center"
          />

          {/* Desktop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/5" />

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:hidden" />

          {/* Content */}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-12 xl:px-16">
              <div className="max-w-3xl text-white">
                
                {/* Eyebrow */}
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold" />

                  <p className="text-xs font-semibold tracking-[0.35em] text-gold sm:text-sm">
                    {slide.eyebrow}
                  </p>
                </div>

                {/* Heading */}
                <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  
                  <a
                    href="/shop"
                    className="group inline-flex items-center justify-center gap-4 bg-burgundy px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-burgundy-dark"
                  >
                    Shop Now

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>

                  <a
                    href="/collections"
                    className="inline-flex items-center justify-center border border-white/70 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-charcoal"
                  >
                    Explore Collection
                  </a>
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