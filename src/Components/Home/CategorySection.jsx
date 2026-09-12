import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    name: "Dresses",
    slug: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Tops",
    slug: "tops",
    image:
      "https://images.unsplash.com/photo-1564257577054-6e7c1c5f5f1a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Skirts",
    slug: "skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Trousers",
    slug: "trousers",
    image:
      "https://images.unsplash.com/photo-1506629905607-d9b1e2d2f7a6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Shoes",
    slug: "shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Bags",
    slug: "bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
];

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

          <a
            href="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:border-burgundy hover:text-burgundy"
          >
            View All

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}