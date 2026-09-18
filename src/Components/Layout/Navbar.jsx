
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal px-4 py-2 text-center text-xs tracking-[0.2em] text-white">
        FREE SHIPPING ON ORDERS OVER GHC 300
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-3xl font-semibold tracking-wide text-burgundy"
          >
            LATASHA CONSIGNMENT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-charcoal transition hover:text-burgundy"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="text-charcoal transition hover:text-burgundy"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="text-charcoal transition hover:text-burgundy"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8C3.2 5.8 5.3 4 7.9 4c1.6 0 3.1.8 4.1 2 1-1.2 2.5-2 4.1-2 2.6 0 4.7 1.8 4.7 4.8Z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center text-charcoal transition hover:text-burgundy"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.567 0 1.07-.379 1.226-.924l1.357-4.75a.75.75 0 0 0-.722-.956H5.106m2.394 6.63L5.106 5.272M7.5 14.25 5.106 5.272M7.5 14.25h10.5m-10.5 0h-1.5"
                />
              </svg>

              {/* Cart Count */}
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="text-charcoal transition hover:text-burgundy"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
              </svg>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">

            {/* Mobile Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center text-charcoal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.567 0 1.07-.379 1.226-.924l1.357-4.75a.75.75 0 0 0-.722-.956H5.106m2.394 6.63L5.106 5.272M7.5 14.25 5.106 5.272M7.5 14.25h10.5m-10.5 0h-1.5"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center"
            >
              <div className="space-y-1.5">
                <span className="block h-px w-6 bg-charcoal" />
                <span className="block h-px w-6 bg-charcoal" />
                <span className="block h-px w-6 bg-charcoal" />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/5 bg-white px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-charcoal transition hover:text-burgundy"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Wishlist */}
              <button
                type="button"
                className="text-left text-sm font-medium text-charcoal transition hover:text-burgundy"
              >
                Wishlist
              </button>

              {/* Mobile Account */}
              <button
                type="button"
                className="text-left text-sm font-medium text-charcoal transition hover:text-burgundy"
              >
                Account
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
