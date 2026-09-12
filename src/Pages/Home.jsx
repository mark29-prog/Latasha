import HeroSlider from "../Components/Home/HeroSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      {/* Temporary section */}
      <section className="bg-ivory px-6 py-24 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
          Coming Next
        </p>

        <h2 className="font-display text-4xl text-charcoal md:text-5xl">
          Shop by Category
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          The next section of the Latasha homepage will showcase our
          collections.
        </p>
      </section>
    </main>
  );
}