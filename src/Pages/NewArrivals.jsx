import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import { getNewArrivals } from "../data/products";

export default function NewArrivals() {
  const { addToCart } = useCart();
  const newArrivals = getNewArrivals();

  return (
    <main className="bg-white">
      {/* Page Header */}
      <section className="border-b border-black/5 bg-ivory px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
            Just Arrived
          </p>

          <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
            New Arrivals
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            The latest pieces added to the Latasha collection, thoughtfully
            selected to elevate your everyday style.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500">
            No new arrivals at the moment. Please check back soon.
          </p>
        )}
      </section>
    </main>
  );
}