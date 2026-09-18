import { Link } from "react-router-dom";
import HeroSlider from "../Components/Home/HeroSlider";
import CategorySection from "../Components/Home/CategorySection";
import ProductSection from "../Components/Home/ProductSection";
import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import { getNewArrivals } from "../data/products";

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
  const featured = getNewArrivals().slice(0, 4);

  return (
    <main>
      <HeroSlider />

      <CategorySection />

      <ProductSection />

      {/* Featured Collection */}
      <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-black/5 bg-white px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <h3 className="font-display text-lg text-charcoal">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden bg-charcoal px-5 py-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
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
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
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
        </div>
      </section>
    </main>
  );
}