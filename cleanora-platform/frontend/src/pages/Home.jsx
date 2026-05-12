import { Link } from 'react-router-dom';
import { CalendarCheck2, ShieldCheck, Sparkles } from 'lucide-react';
import GallerySection from '../components/GallerySection.jsx';
import HeroSection from '../components/hero/HeroSection.jsx';
import BeforeAfterCompareSection from '../components/home/BeforeAfterCompareSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent } from '../components/ui/card.jsx';

const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

const aboutCards = [
  {
    title: 'Trusted professionals',
    description: 'Careful teams for residential and commercial cleaning needs.',
    Icon: ShieldCheck
  },
  {
    title: 'Flexible scheduling',
    description: 'Customers can choose a service, date, time, and address online.',
    Icon: CalendarCheck2
  },
  {
    title: 'Quality-first process',
    description: 'Admin staff can review incoming requests and track completed jobs.',
    Icon: Sparkles
  }
];

function Home() {
  return (
    <>
      <HeroSection />

      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-cleanora-mint/10 blur-3xl" />
        <SectionHeader
          eyebrow="About"
          title="Built for polished service operations"
          description="Cleanora will combine customer booking, service management, and admin workflows inside one refined platform."
        />
        <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {aboutCards.map(({ title, description, Icon }) => (
            <Card
              key={title}
              className="group border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cleanora-mint/40 hover:shadow-xl hover:shadow-cleanora-ink/10"
            >
              <CardContent className="p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-cleanora-mint/10 text-cleanora-mint ring-1 ring-cleanora-mint/20 transition group-hover:bg-cleanora-mint group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <BeforeAfterCompareSection />

      <ServicesSection />

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cleanora-mint/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-white/10 bg-cleanora-ink p-8 text-white shadow-2xl shadow-cleanora-ink/25 md:flex-row md:items-center lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cleanora-mint/20 blur-3xl" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cleanora-mint">Booking Preview</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Schedule a polished clean in minutes
            </h2>
          </div>
          <Button variant="secondary" size="lg" asChild className="relative bg-white shadow-xl shadow-black/15">
            <Link to="/book">Open Booking Page</Link>
          </Button>
        </div>
      </section>

      <GallerySection />
      <ReviewsSection />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Card className="mx-auto max-w-6xl overflow-hidden rounded-3xl border-slate-200/70 bg-white/80 shadow-xl shadow-cleanora-ink/10 backdrop-blur-xl">
          <CardContent className="relative flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center lg:p-10">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cleanora-mint/10 blur-3xl" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cleanora-mint">Need help?</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-cleanora-ink sm:text-4xl">
                Need help choosing a service?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Talk to Cleanora Services for package guidance, quick queries, and location details.
              </p>
            </div>
            <div className="relative flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default Home;
