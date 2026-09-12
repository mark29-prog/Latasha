import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal px-4 py-2 text-center text-xs tracking-[0.2em] text-white">
        FREE SHIPPING ON ORDERS OVER GHC 300
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          
          {/* Logo */}
          <a
            href="/"
            className="font-display text-3xl font-semibold tracking-wide text-burgundy"
          >
            LATASHA
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="/"
              className="text-sm font-medium text-charcoal transition hover:text-burgundy"
            >
              Home
            </a>

            <a
              href="/shop"
              className="text-sm font-medium text-charcoal transition hover:text-burgundy"
            >
              Shop
            </a>

            <a
              href="/new-arrivals"
              className="text-sm font-medium text-charcoal transition hover:text-burgundy"
            >
              New Arrivals
            </a>

            <a
              href="/collections"
              className="text-sm font-medium text-charcoal transition hover:text-burgundy"
            >
              Collections
            </a>

            <a
              href="/about"
              className="text-sm font-medium text-charcoal transition hover:text-burgundy"
            >
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">
            
            {/* Search */}
            <button
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
            <button
              aria-label="Shopping cart"
              className="relative text-charcoal transition hover:text-burgundy"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M4 5h2l2 11h9l2-8H7" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="17" cy="20" r="1" />
              </svg>

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[9px] text-white">
                0
              </span>
            </button>

            {/* Account */}
            <button
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden"
          >
            <div className="space-y-1.5">
              <span className="block h-px w-6 bg-charcoal" />
              <span className="block h-px w-6 bg-charcoal" />
              <span className="block h-px w-6 bg-charcoal" />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/5 bg-white px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5">
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["New Arrivals", "/new-arrivals"],
                ["Collections", "/collections"],
                ["About", "/about"],
              ].map(([name, path]) => (
                <a
                  key={name}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-charcoal transition hover:text-burgundy"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}