import { Link } from "react-router-dom";
import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import {
  categories,
  getFeaturedProducts,
  getProductsByCategory,
} from "../data/products";

const collections = [
  {
    id: "everyday-elegance",
    title: "Everyday Elegance",
    description:
      "Refined staples designed to make every day feel effortlessly put together.",
    slug: "tops",
  },
  {
    id: "evening-edit",
    title: "The Evening Edit",
    description:
      "Statement dresses and elevated pieces for moments that deserve to be remembered.",
    slug: "dresses",
  },
  {
    id: "accessories",
    title: "Finishing Touches",
    description:
      "Bags, shoes and jewellery that complete and define your look.",
    slug: "accessories",
  },
];

export default function Collections() {
  const { addToCart } = useCart();
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <main className="bg-white">
      {/* Page Header */}
      <section className="bg-charcoal px-5 py-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Curated Edits
          </p>

          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl lg:text-6xl">
            Collections
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Discover our curated edits, each thoughtfully assembled around a
            mood, moment or signature style.
          </p>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="space-y-16">
          {collections.map((collection, index) => {
            const items = getProductsByCategory(collection.slug).slice(0, 4);

            return (
              <div key={collection.id}>
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
                      {String(index + 1).padStart(2, "0")} — Collection
                    </p>

                    <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
                      {collection.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                      {collection.description}
                    </p>
                  </div>

                  <Link
                    to={`/shop?category=${collection.slug}`}
                    className="group inline-flex w-fit items-center gap-3 border-b border-charcoal pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:border-burgundy hover:text-burgundy"
                  >
                    Shop Collection
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>

                {items.length > 0 ? (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
                    {items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Products coming soon to this collection.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="border-t border-black/5 bg-ivory px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center font-display text-3xl text-charcoal sm:text-4xl">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-gray-100"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-2xl font-medium">
                    {category.name}
                  </h3>

                  <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    Shop Now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <h2 className="mb-10 text-center font-display text-3xl text-charcoal sm:text-4xl">
          Featured Picks
        </h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );
}