import { AstrologyPulse } from '@/components/AstrologyPulse';
import { HeroSection } from '@/components/HeroSection';
import { MoonPhaseWidget } from '@/components/MoonPhaseWidget';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="px-6 pb-14 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <MoonPhaseWidget />
          <AstrologyPulse />
        </div>
      </section>
    </>
  );
}
