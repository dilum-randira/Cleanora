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
    <div className="relative mx-auto h-full w-full max-w-5xl rounded-[2rem] bg-slate-950 p-2 shadow-2xl shadow-slate-950/30 sm:p-3 md:rounded-[2.5rem] md:p-4">
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-slate-700 sm:top-3 sm:w-24" />
      <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/15 bg-slate-100 shadow-inner md:rounded-[2rem]">
        <iframe
          title="Cleanora Services Location Map"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-xl bg-white/90 p-3 shadow-lg shadow-slate-900/15 backdrop-blur md:left-5 md:top-5 md:max-w-xs md:p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cleanora-mint text-cleanora-ink">
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

        <div className="absolute bottom-3 right-3 z-10 hidden gap-2 sm:flex md:bottom-5 md:right-5">
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
    <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-cleanora-porcelain to-white">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cleanora-mint">
              Contact & Location
            </p>
            <h2 className="mx-auto mt-4 max-w-[20rem] break-words text-3xl font-black leading-tight text-cleanora-ink sm:max-w-4xl sm:text-4xl md:text-6xl">
              Find Cleanora Services
              <br />
              <span className="text-cleanora-mint">On the Map</span>
            </h2>
          </>
        }
      >
        <ContactMapDevice />
      </ContainerScroll>
    </div>
  );
}

export default ContactMapDeviceShowcase;
