import { Link } from 'react-router-dom';
import { Button } from './ui/button.jsx';
import { Card, CardContent } from './ui/card.jsx';

const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

function ContactSection() {
  return (
    <section id="contact" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">Contact</p>
          <h2 className="mt-3 text-3xl font-black text-cleanora-ink sm:text-4xl">
            Talk to Cleanora Services
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Book a cleaning visit, ask about a service, or coordinate a custom cleaning plan for your home or workplace.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              ['Company', 'Cleanora Services'],
              ['Address', 'Colombo, Sri Lanka'],
              ['Email', 'hello@cleanora.com'],
              ['Phone', '+94 77 123 4567'],
              ['Business Hours', 'Monday - Saturday, 8:00 AM - 6:00 PM']
            ].map(([label, value]) => (
              <Card key={label} className="bg-cleanora-porcelain">
                <CardContent className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-2 text-base font-bold text-cleanora-ink">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/book">
              Book a Service
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden bg-cleanora-mist shadow-soft">
          <iframe
            title="Cleanora Services Colombo map"
            src="https://www.google.com/maps?q=Colombo%2C%20Sri%20Lanka&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Card>
      </div>
    </section>
  );
}

export default ContactSection;
