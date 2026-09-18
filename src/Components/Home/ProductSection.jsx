import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useCart } from "../../context/CartContext";
import { getFeaturedProducts } from "../../data/products";

export default function ProductSection() {
  const { addToCart } = useCart();
  const products = getFeaturedProducts().slice(0, 8);

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
              Just arrived
            </p>

            <h2 className="font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              New Arrivals
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Discover the latest pieces added to the Latasha collection,
              thoughtfully selected to elevate your everyday style.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:border-burgundy hover:text-burgundy"
          >
            Shop All

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            to="/new-arrivals"
            className="border border-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-burgundy hover:bg-burgundy hover:text-white"
          >
            Discover All Products
          </Link>
        </div>
      </div>
    </section>
  );
}