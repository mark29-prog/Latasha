import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SHIPPING_THRESHOLD = 300;
const SHIPPING_FEE = 25;

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const number = `LAT-${Date.now().toString().slice(-6)}`;
    setOrderNumber(number);
    setOrderPlaced(true);
    clearCart();
  };

  // Order Confirmation
  if (orderPlaced) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-2xl text-white">
          ✓
        </div>

        <h1 className="mt-6 font-display text-3xl text-charcoal">
          Thank You for Your Order
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          Your order{" "}
          <span className="font-semibold text-charcoal">{orderNumber}</span>{" "}
          has been placed successfully. A confirmation email will be sent
          shortly.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-burgundy-dark"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="border border-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <h1 className="font-display text-3xl text-charcoal">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-gray-500">
          Add some items to your cart before checking out.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-burgundy px-6 py-3 text-sm font-medium text-white transition hover:bg-burgundy-dark"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  const inputClass =
    "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:border-burgundy focus:outline-none";

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <h1 className="mb-10 font-display text-3xl text-charcoal sm:text-4xl">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-12 lg:grid-cols-[1.5fr_1fr]"
      >
        {/* Form */}
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="mb-5 border-b border-black/10 pb-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
              Contact Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                required
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="mb-5 border-b border-black/10 pb-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
              Shipping Address
            </h2>

            <div className="grid gap-4">
              <input
                required
                type="text"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  required
                  type="text"
                  name="region"
                  placeholder="Region / State"
                  value={formData.region}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Payment (demo) */}
          <section>
            <h2 className="mb-5 border-b border-black/10 pb-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
              Payment
            </h2>

            <div className="border border-dashed border-charcoal/20 bg-ivory p-5 text-sm text-gray-600">
              This is a demo store. No payment will be taken — placing an order
              simply confirms your cart.
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="h-fit border border-black/10 bg-ivory p-6 lg:sticky lg:top-28">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <div className="text-sm">
                  <p className="font-medium text-charcoal">{item.name}</p>

                  <p className="text-gray-500">
                    Qty {item.quantity}
                    {item.size ? ` · Size ${item.size}` : ""}
                  </p>
                </div>

                <span className="text-sm font-medium text-charcoal">
                  GHC{" "}
                  {((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm">
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

          <button
            type="submit"
            className="mt-6 w-full bg-burgundy px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
          >
            Place Order
          </button>

          <Link
            to="/cart"
            className="mt-4 block text-center text-xs font-medium uppercase tracking-[0.15em] text-gray-500 transition hover:text-burgundy"
          >
            Return to Cart
          </Link>
        </aside>
      </form>
    </main>
  );
}