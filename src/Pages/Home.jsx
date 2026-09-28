import { Link } from "react-router-dom";
import HeroSlider from "../Components/Home/HeroSlider";
import CategorySection from "../Components/Home/CategorySection";
import ProductSection from "../Components/Home/ProductSection";
import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import useCatalog from "../hooks/useCatalog";
import { useState } from "react";
import { api } from "../api/client";
import Reveal from "../Components/Layout/Reveal";

const benefits = [
  {
    title: "Free Shipping",
    description: "On all orders over GHC 300",
  },
  {
    title: "Easy Returns",
    description: "14-day returns on all items",
  },
  {
    title: "Secure Checkout",
    description: "Safe and simple payments",
  },
  {
    title: "Curated Quality",
    description: "Hand-selected, timeless pieces",
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const { products } = useCatalog();
  const featured = products.filter((product) => product.is_new).slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const subscribe = async (event) => {
    event.preventDefault();
    try {
      const result = await api.subscribe(newsletterEmail);
      setNewsletterMessage(result.message || "Subscription confirmed.");
      setNewsletterEmail("");
    } catch (error) { setNewsletterMessage(error.message); }
  };

  return (
    <main>
      <HeroSlider />

      <CategorySection />

      <ProductSection />

      {/* Featured Collection */}
      <Reveal as="section" animateText className="bg-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end" distance={18}>
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
                Curated for you
              </p>

              <h2 className="font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Featured Collection
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                A considered selection of our most-loved pieces, chosen to
                bring effortless elegance to your wardrobe.
              </p>
            </div>

            <Link
              to="/collections"
              className="group inline-flex w-fit items-center gap-3 border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:border-burgundy hover:text-burgundy"
            >
              View Collections

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.07} distance={28}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Benefits */}
      <Reveal as="section" animateText className="border-t border-black/5 bg-white px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08} distance={20} className="text-center">
              <h3 className="font-display text-lg text-charcoal">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Newsletter CTA */}
      <Reveal as="section" animateText className="relative overflow-hidden bg-charcoal px-5 py-20 text-center sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl" distance={28}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Join the List
          </p>

          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Be the First to Know
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Sign up for early access to new arrivals, exclusive offers and
            styling inspiration.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={subscribe}
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full border border-white/20 bg-transparent px-4 py-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />

            <button
              type="submit"
              className="bg-burgundy px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
            >
              Subscribe
            </button>
          </form>
          {newsletterMessage && <p role="status" className="mt-4 text-sm text-white">{newsletterMessage}</p>}
        </Reveal>
      </Reveal>
    </main>
  );
}
