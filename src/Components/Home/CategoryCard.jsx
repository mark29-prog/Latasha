import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden bg-gray-100"
    >
      {/* Category Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <h3 className="font-display text-2xl font-medium sm:text-3xl">
          {category.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
          <span>Shop Now</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}