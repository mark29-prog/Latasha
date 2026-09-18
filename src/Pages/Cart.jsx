import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getFeaturedProducts } from "../data/products";
import ProductCard from "../Components/Home/ProductCard";

const SHIPPING_THRESHOLD = 300;
const SHIPPING_FEE = 25;

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    SHIPPING_THRESHOLD - cartTotal
  );

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <h1 className="mb-10 font-display text-3xl text-charcoal sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="py-12 text-center">
          <p className="text-gray-500">Your shopping cart is empty.</p>

          <Link
            to="/shop"
            className="mt-6 inline-block bg-burgundy px-6 py-3 text-sm font-medium text-white transition hover:bg-burgundy-dark"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Suggestions */}
        <section className="mt-16 border-t border-black/5 pt-14">
          <h2 className="mb-10 font-display text-2xl text-charcoal sm:text-3xl">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {getFeaturedProducts()
              .slice(0, 4)
              .map((product) => (
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

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="font-display text-3xl text-charcoal sm:text-4xl">
          Shopping Cart
        </h1>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 transition hover:text-burgundy"
        >
          Clear Cart
        </button>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
      </p>

      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 ? (
        <div className="mb-8 border border-black/10 bg-ivory p-4 text-sm text-gray-600">
          Add{" "}
          <span className="font-semibold text-burgundy">
            GHC {remainingForFreeShipping.toFixed(2)}
          </span>{" "}
          more to qualify for free shipping.
        </div>
      ) : (
        <div className="mb-8 border border-gold/40 bg-gold/10 p-4 text-sm text-charcoal">
          You have qualified for free shipping.
        </div>
      )}

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        {/* Cart Items */}
        <div className="divide-y divide-black/10 border-y border-black/10">
          {cartItems.map((item) => {
            const price = item.salePrice ?? item.price;

            return (
              <div
                key={item.id}
                className="flex gap-4 py-6 sm:gap-6"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="h-28 w-24 flex-shrink-0 overflow-hidden bg-gray-100 sm:h-32 sm:w-28"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {item.category}
                      </p>

                      <h2 className="mt-1 font-display text-lg text-charcoal">
                        <Link
                          to={`/product/${item.id}`}
                          className="transition hover:text-burgundy"
                        >
                          {item.name}
                        </Link>
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-sm text-gray-400 transition hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-charcoal/20">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Decrease quantity"
                        className="px-3 py-2 text-charcoal transition hover:bg-ivory"
                      >
                        −
                      </button>

                      <span className="w-8 text-center text-sm font-semibold text-charcoal">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                        className="px-3 py-2 text-charcoal transition hover:bg-ivory"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-charcoal">
                        GHC {(price * item.quantity).toFixed(2)}
                      </p>

                      <p className="text-xs text-gray-500">
                        GHC {price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <aside className="h-fit border border-black/10 bg-ivory p-6 lg:sticky lg:top-28">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
            Order Summary
          </h2>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-charcoal">GHC {cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-charcoal">
                {shipping === 0 ? "Free" : `GHC ${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
              <span className="text-charcoal">Total</span>
              <span className="text-burgundy">GHC {total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block w-full bg-burgundy px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="mt-4 block text-center text-xs font-medium uppercase tracking-[0.15em] text-gray-500 transition hover:text-burgundy"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>

      {/* Suggestions */}
      <section className="mt-20 border-t border-black/5 pt-14">
        <h2 className="mb-10 font-display text-2xl text-charcoal sm:text-3xl">
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {getFeaturedProducts()
            .slice(0, 4)
            .map((product) => (
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