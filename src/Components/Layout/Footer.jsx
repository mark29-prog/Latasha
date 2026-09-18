import { Link } from "react-router-dom";

export default function Footer() {
  const shopLinks = [
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Dresses", path: "/shop?category=dresses" },
    { name: "Tops", path: "/shop?category=tops" },
    { name: "Bags", path: "/shop?category=bags" },
    { name: "Accessories", path: "/shop?category=accessories" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Collections", path: "/collections" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl tracking-wide text-white">
              LATASHA CONSIGNMENT
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Thoughtfully curated fashion for the modern woman. Discover
              timeless pieces designed to bring confidence, elegance and
              effortless style to every occasion.
            </p>

            <div className="mt-7 flex gap-4">
              {["Instagram", "Facebook", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-xs uppercase tracking-wide text-white/70 transition hover:border-gold hover:text-gold"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Shop
            </h4>

            <ul className="mt-6 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Company
            </h4>

            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Newsletter
            </h4>

            <form
              className="mt-4 flex"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />

              <button
                type="submit"
                className="bg-burgundy px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-burgundy-dark"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Latasha Consignment. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}