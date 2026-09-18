import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import { categories, products } from "../data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function Shop() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");

  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = useMemo(() => {
    const list =
      activeCategory === "all"
        ? [...products]
        : products.filter((product) => product.categorySlug === activeCategory);

    switch (sortBy) {
      case "price-asc":
        return list.sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        );
      case "price-desc":
        return list.sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
        );
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      default:
        return list.sort(
          (a, b) => Number(b.isFeatured) - Number(a.isFeatured)
        );
    }
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (slug) => {
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <main className="bg-white">
      {/* Page Header */}
      <section className="border-b border-black/5 bg-ivory px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
            The Collection
          </p>

          <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
            Shop All
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Explore our full range of thoughtfully curated pieces, designed to
            bring confidence and elegance to your everyday wardrobe.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        {/* Toolbar */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                activeCategory === "all"
                  ? "border-burgundy bg-burgundy text-white"
                  : "border-charcoal/20 text-charcoal hover:border-burgundy hover:text-burgundy"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.slug)}
                className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                  activeCategory === category.slug
                    ? "border-burgundy bg-burgundy text-white"
                    : "border-charcoal/20 text-charcoal hover:border-burgundy hover:text-burgundy"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500"
            >
              Sort
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="border border-charcoal/20 bg-white px-4 py-2 text-sm text-charcoal focus:border-burgundy focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-gray-500">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              No products found in this category.
            </p>

            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="mt-6 bg-burgundy px-6 py-3 text-sm font-medium text-white transition hover:bg-burgundy-dark"
            >
              View All Products
            </button>
          </div>
        )}
      </section>
    </main>
  );
}