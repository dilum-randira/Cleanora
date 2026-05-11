import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button.jsx';
import { Card, CardContent } from '../ui/card.jsx';

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas.jsx'));

const trustStats = [
  '8+ Cleaning Services',
  '24/7 Online Booking',
  'Admin Managed Workflow'
];

function HeroSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
        <div className="max-w-[22rem] sm:max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">
            Cleanora Services
          </p>
          <h1 className="max-w-full break-words text-2xl font-black leading-tight text-cleanora-ink min-[420px]:text-3xl sm:text-5xl lg:text-6xl">
            Premium Cleaning Services for Modern Homes & Workspaces
          </h1>
          <p className="mt-5 text-xl font-bold text-cleanora-mint">
            Spotless Homes, Stress-Free Life
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Book trusted cleaning professionals, choose your preferred service, and manage appointments through a modern digital platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/book">Book Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#services">View Services</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustStats.map((stat) => (
              <Card key={stat} className="bg-cleanora-porcelain">
                <CardContent className="p-4">
                  <p className="text-sm font-black text-cleanora-ink">{stat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid h-[320px] place-items-center rounded-lg border border-slate-200 bg-cleanora-mist text-sm font-bold text-cleanora-ink shadow-soft sm:h-[420px] lg:h-[520px]">
              Preparing Cleanora 3D scene...
            </div>
          }
        >
          <Hero3DCanvas />
        </Suspense>
      </div>
    </section>
  );
}

export default HeroSection;
