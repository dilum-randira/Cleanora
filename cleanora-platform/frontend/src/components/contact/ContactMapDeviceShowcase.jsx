import { Link } from 'react-router-dom';
import { CalendarCheck, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContainerScroll } from '../ui/container-scroll-animation.jsx';
import { Button } from '../ui/button.jsx';

const city = 'Colombo, Sri Lanka';
const mapQuery = encodeURIComponent(city);
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

function ContactMapDevice() {
  return (
    <div className="relative mx-auto h-full w-full max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-slate-950/25 sm:p-3 md:rounded-[2.5rem] md:p-4">
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-slate-700/80 sm:top-3 sm:w-24" />
      <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/20 bg-white shadow-inner md:rounded-[2rem]">
        <iframe
          title="Cleanora Services Location Map"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/70 bg-white/90 p-3 shadow-xl shadow-slate-900/20 backdrop-blur-xl md:left-5 md:top-5 md:max-w-xs md:p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cleanora-mint/10 text-cleanora-mint ring-1 ring-cleanora-mint/25">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-cleanora-ink md:text-base">Cleanora Services</p>
              <p className="mt-1 text-xs font-semibold text-slate-600 md:text-sm">{city}</p>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center text-xs font-black text-cleanora-mint underline-offset-4 hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap justify-end gap-2 md:bottom-5 md:right-5 md:left-auto">
          <Button asChild size="sm" variant="secondary" className="bg-white/90 shadow-lg backdrop-blur">
            <a href="tel:+94771234567">
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
          <Button asChild size="sm" className="shadow-lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" variant="secondary" className="bg-white/90 shadow-lg backdrop-blur">
            <Link to="/book">
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ContactMapDeviceShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-cleanora-porcelain to-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-cleanora-mint/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <ContainerScroll
          className="min-h-[39rem] px-0 py-0 md:min-h-[54rem] md:px-0"
          contentClassName="py-0 md:py-8"
          cardClassName="mt-7 h-[26rem] w-full max-w-6xl rounded-[2rem] border-white/70 bg-white/70 p-2 shadow-2xl shadow-cleanora-ink/15 backdrop-blur-xl sm:h-[32rem] md:mt-10 md:h-[40rem] md:p-3"
          innerClassName="rounded-[1.5rem] bg-transparent"
          titleComponent={
            <>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-cleanora-mint">
                Contact & Location
              </p>
              <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-cleanora-ink sm:text-4xl md:text-6xl">
                Find Cleanora Services
                <span className="block text-cleanora-mint">On the Map</span>
              </h2>
            </>
          }
        >
          <ContactMapDevice />
        </ContainerScroll>
      </div>
    </section>
  );
}

export default ContactMapDeviceShowcase;
