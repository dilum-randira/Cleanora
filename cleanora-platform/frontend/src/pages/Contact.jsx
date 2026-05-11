import { Link } from 'react-router-dom';
import {
  CalendarClock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react';
import ContactTabletShowcase from '../components/contact/ContactTabletShowcase.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent } from '../components/ui/card.jsx';

const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

const contactCards = [
  {
    title: 'Call Us',
    value: '+94 77 123 4567',
    description: 'Speak with the Cleanora team.',
    icon: Phone
  },
  {
    title: 'Email Us',
    value: 'hello@cleanora.com',
    description: 'Send service questions anytime.',
    icon: Mail
  },
  {
    title: 'Visit Location',
    value: 'Colombo, Sri Lanka',
    description: 'Serving modern homes and workspaces.',
    icon: MapPin
  },
  {
    title: 'Business Hours',
    value: 'Monday - Saturday',
    description: '8:00 AM - 6:00 PM',
    icon: CalendarClock
  }
];

function Contact() {
  return (
    <div className="overflow-hidden">
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">
            Home / Contact
          </p>
          <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-[22rem] break-words text-4xl font-black leading-tight text-cleanora-ink sm:max-w-3xl sm:text-5xl">
                Contact Cleanora Services
              </h1>
              <p className="mt-5 max-w-[22rem] text-base leading-7 text-slate-600 sm:max-w-3xl sm:text-lg sm:leading-8">
                Have a question or need help choosing a cleaning package? Our team is ready to help.
              </p>
            </div>
            <Card className="bg-cleanora-porcelain">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cleanora-ink text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-black text-cleanora-ink">Emergency / Quick Queries</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">WhatsApp Available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactTabletShowcase />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-cleanora-mist text-cleanora-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-cleanora-ink">{item.title}</h3>
                  <p className="mt-2 font-bold text-cleanora-mint">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-6xl bg-cleanora-ink text-white shadow-soft">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cleanora-mint">Quick Actions</p>
              <h2 className="mt-3 text-3xl font-black">Ready to plan your next clean?</h2>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Button asChild variant="secondary" size="lg">
                <Link to="/book">Book a Cleaning</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-cleanora-ink">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/#services">View Services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Contact;
