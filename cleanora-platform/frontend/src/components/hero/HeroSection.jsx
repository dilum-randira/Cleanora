import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button.jsx';

const trustStats = [
  '8+ Services',
  '24/7 Booking',
  'Admin Managed'
];

function HeroSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white sm:min-h-[90vh]">
      {videoFailed ? (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-cleanora-mist to-cleanora-mint/30" />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/cleanora-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          aria-label="Cleanora cleaning service background video"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10 sm:from-white/90 sm:via-white/60 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/15" />
      <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-cleanora-mint/20 blur-3xl" />
      <div className="absolute inset-y-0 left-0 w-[min(860px,100%)] bg-white/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-14 sm:min-h-[90vh] sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          className="relative mx-auto w-full max-w-[760px] px-1 py-4 text-cleanora-ink sm:mx-0 sm:px-0 sm:py-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-cleanora-mint sm:text-sm">
            Cleanora Services
          </p>
          <h1 className="max-w-[760px] text-4xl font-extrabold leading-[0.98] tracking-tight text-cleanora-ink min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
            Premium Cleaning
            <span className="block sm:inline"> Services</span>
            <span className="block">for Modern Homes &</span>
            <span className="block">Workspaces</span>
          </h1>
          <p className="mt-7 text-lg font-semibold text-cleanora-mint sm:text-xl">
            Spotless Homes, Stress-Free Life
          </p>
          <p className="mt-4 max-w-[560px] text-base leading-relaxed text-slate-700 sm:text-lg">
            Book trusted professionals, choose a service, and manage appointments through a modern digital platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="shadow-xl shadow-cleanora-ink/25 transition hover:-translate-y-0.5">
              <Link to="/book">Book Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-slate-200/80 bg-white/80 text-cleanora-ink shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cleanora-mint hover:bg-white hover:text-cleanora-ink"
            >
              <Link to="/#services">View Services</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {trustStats.map((stat) => (
              <div
                key={stat}
                className="rounded-full border border-slate-200/70 bg-white/75 px-3.5 py-2 shadow-sm shadow-cleanora-ink/5 backdrop-blur-sm sm:px-4"
              >
                <p className="text-xs font-bold text-cleanora-ink sm:text-sm">{stat}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
