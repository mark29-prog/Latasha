import { Link } from "react-router-dom";

const values = [
  {
    title: "Curated with Care",
    description:
      "Every piece is hand-selected for its quality, craftsmanship and timeless appeal.",
  },
  {
    title: "Conscious Fashion",
    description:
      "We champion consignment and considered buying, giving beautiful pieces a second life.",
  },
  {
    title: "For Every Woman",
    description:
      "Our collections are designed to celebrate confidence, comfort and individuality.",
  },
];

export default function About() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2200&q=85"
          alt="Latasha Consignment"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Story
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-white sm:text-5xl lg:text-6xl">
            Timeless Style, Thoughtfully Curated
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Latasha Consignment was born from a love of beautiful clothing and
            a belief that style should be both effortless and enduring.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
              Who We Are
            </p>

            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
              A Boutique Built on Beautiful Pieces
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-gray-600">
              <p>
                We believe that the most memorable wardrobes are built slowly,
                piece by piece, with intention. Our mission is to make
                exceptional fashion accessible, sustainable and personal.
              </p>

              <p>
                From statement evening wear to everyday essentials, every item
                in our collection is chosen for its quality, its character and
                the way it makes you feel. We work with trusted consignors and
                designers to bring you pieces that are as unique as you are.
              </p>

              <p>
                Whether you are searching for a single standout piece or
                refreshing your entire wardrobe, we are here to help you find
                something you will love for years to come.
              </p>
            </div>

            <Link
              to="/shop"
              className="mt-8 inline-block bg-burgundy px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
            >
              Explore the Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85"
              alt="Curated fashion"
              className="h-full w-full object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"
              alt="Boutique styling"
              className="mt-8 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-black/5 bg-ivory px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl text-charcoal sm:text-4xl">
            What We Stand For
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="border border-black/5 bg-white p-8"
              >
                <span className="font-display text-3xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-display text-xl text-charcoal">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal px-5 py-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Ready to Find Your Next Favourite Piece?
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Browse our latest arrivals and discover something you will love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-burgundy px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}