import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import HeroSection from '../components/hero/HeroSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent } from '../components/ui/card.jsx';

function Home() {
  return (
    <>
      <HeroSection />

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Built for polished service operations"
          description="Cleanora will combine customer booking, service management, and admin workflows inside one refined platform."
        />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            ['Trusted professionals', 'Careful teams for residential and commercial cleaning needs.'],
            ['Flexible scheduling', 'Customers can choose a service, date, time, and address online.'],
            ['Quality-first process', 'Admin staff can review incoming requests and track completed jobs.']
          ].map(([title, description]) => (
            <Card key={title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ServicesSection />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-lg bg-cleanora-ink p-8 text-white shadow-soft md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">Booking Preview</p>
            <h2 className="mt-3 text-3xl font-black">Schedule a polished clean in minutes</h2>
          </div>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/book">Open Booking Page</Link>
          </Button>
        </div>
      </section>

      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}

export default Home;
