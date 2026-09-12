import HeroSlider from "../Components/Home/HeroSlider";
import CategorySection from "../Components/Home/CategorySection";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <HeroSlider />

      {/* Shop By Category */}
      <CategorySection />

      {/* Temporary placeholder for next section */}
      <section className="bg-white px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">
          Coming Next
        </p>

        <h2 className="mt-3 font-display text-4xl text-charcoal">
          New Arrivals
        </h2>
      </section>
    </main>
  );
}