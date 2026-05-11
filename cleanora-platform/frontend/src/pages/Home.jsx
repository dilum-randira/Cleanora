import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import ServicesSection from '../components/ServicesSection.jsx';

const galleryItems = ['Kitchen Shine', 'Living Room Refresh', 'Workspace Polish'];

function Home() {
  return (
    <>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">
              Premium Cleaning Services
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-cleanora-ink sm:text-5xl lg:text-6xl">
              Cleanora
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Spotless spaces, effortless booking, and a polished customer experience for modern homes and workplaces.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/booking"
                className="inline-flex justify-center rounded-lg bg-cleanora-ink px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-cleanora-charcoal"
              >
                Book Now
              </Link>
              <Link
                to="/services"
                className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-cleanora-ink transition hover:border-cleanora-mint hover:text-cleanora-mint"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] rounded-lg bg-cleanora-mist p-5 shadow-soft">
            <div className="absolute inset-5 rounded-lg bg-white/75" />
            <div className="relative grid h-full min-h-[320px] content-between rounded-lg border border-white bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-cleanora-ink px-4 py-2 text-sm font-bold text-white">Today</span>
                <span className="text-sm font-semibold text-cleanora-mint">98% satisfaction</span>
              </div>
              <div className="grid gap-4">
                <div className="h-24 rounded-lg bg-gradient-to-r from-cleanora-mint to-cleanora-aqua p-4 text-white">
                  <p className="text-sm font-semibold">Residential refresh</p>
                  <p className="mt-2 text-2xl font-black">2:30 PM</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase text-slate-400">Teams</p>
                    <p className="mt-2 text-2xl font-black">12</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase text-slate-400">Bookings</p>
                    <p className="mt-2 text-2xl font-black">48</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-cleanora-ink p-4 text-sm leading-6 text-slate-200">
                Future 3D hero space reserved for React Three Fiber animation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Built for polished service operations"
          description="Cleanora will combine customer booking, service management, and admin workflows inside one refined platform."
        />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {['Trusted professionals', 'Flexible scheduling', 'Quality-first process'].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder content prepared for the full About module.
              </p>
            </div>
          ))}
        </div>
      </section>

      <ServicesSection />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-lg bg-cleanora-ink p-8 text-white shadow-soft md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">Booking Preview</p>
            <h2 className="mt-3 text-3xl font-black">Ready for the future booking flow</h2>
          </div>
          <Link
            to="/booking"
            className="rounded-lg bg-white px-6 py-4 text-sm font-bold text-cleanora-ink transition hover:-translate-y-0.5"
          >
            Open Booking Page
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Gallery"
          title="Results preview"
          description="Gallery and review content will be connected in a later development step."
        />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {galleryItems.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid aspect-[4/3] place-items-center rounded-lg bg-cleanora-mist text-sm font-bold text-cleanora-ink">
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
