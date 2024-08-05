import FeatureSection from "~/components/FeatureSection";
import Hero from "~/components/Hero";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Hero />  
        {/* <WeatherChart weatherStatus={weatherStatus}/> */}
        <FeatureSection />
      </div>
    </main>
  );
}
