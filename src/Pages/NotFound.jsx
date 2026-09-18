import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center lg:px-8">
      <p className="font-display text-7xl text-burgundy sm:text-9xl">404</p>

      <h1 className="mt-6 font-display text-3xl text-charcoal sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 text-sm leading-7 text-gray-600">
        The page you are looking for may have been moved, removed, or never
        existed. Let us help you find your way back.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-burgundy-dark"
        >
          Back Home
        </Link>

        <Link
          to="/shop"
          className="border border-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}