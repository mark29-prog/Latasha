import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { categories } from "../../data/products";

export default function CategorySection() {
  return (
    <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
              Explore the collection
            </p>

            <h2 className="font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              Shop by Category
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Discover thoughtfully selected pieces designed to bring
              confidence, elegance and effortless style to every occasion.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:border-burgundy hover:text-burgundy"
          >
            View All

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}