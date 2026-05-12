import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CalendarClock,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react';
import ContactMapDeviceShowcase from '../components/contact/ContactMapDeviceShowcase.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Textarea } from '../components/ui/textarea.jsx';

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

const trustPoints = [
  'Free quote request',
  'No account required',
  'Quick response through WhatsApp or email'
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  message: ''
};

function validateContactForm(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-semibold text-red-600">{message}</p>;
}

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: ''
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please complete the required contact fields.');
      return;
    }

    toast.success('Message prepared successfully. Please contact us through email or WhatsApp.');
    setFormData(initialFormData);
  }

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-cleanora-mint/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cleanora-mint">
            Home / Contact
          </p>
          <div className="relative mt-5 grid min-w-0 gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-[22rem] break-words text-4xl font-black leading-tight tracking-tight text-cleanora-ink sm:max-w-3xl sm:text-5xl lg:text-6xl">
                Contact Cleanora Services
              </h1>
              <p className="mt-5 max-w-[22rem] text-base leading-7 text-slate-600 sm:max-w-3xl sm:text-lg sm:leading-8">
                Have a question or need help choosing a cleaning package? Our team is ready to help.
              </p>
            </div>
            <Card className="group overflow-hidden rounded-2xl border-slate-200/70 bg-white/75 shadow-xl shadow-cleanora-ink/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cleanora-mint/40 hover:shadow-2xl hover:shadow-cleanora-ink/10">
              <CardContent className="relative flex items-start gap-4 p-5 sm:p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cleanora-mint/10 blur-3xl" />
                <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cleanora-ink text-white shadow-soft">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="relative">
                  <h2 className="font-black text-cleanora-ink">Emergency / Quick Queries</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">WhatsApp Available</p>
                  <Button asChild size="sm" className="mt-4">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactMapDeviceShowcase />

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-cleanora-mint/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group h-full rounded-2xl border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cleanora-mint/40 hover:shadow-xl hover:shadow-cleanora-ink/10"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-cleanora-mint/10 text-cleanora-mint ring-1 ring-cleanora-mint/20 transition group-hover:bg-cleanora-mint group-hover:text-white">
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

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cleanora-mint/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cleanora-mint">Send a Message</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-cleanora-ink sm:text-4xl lg:text-5xl">
              Tell us what you need cleaned
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Share a few details and the Cleanora team will help you choose the right package, schedule, and next step.
            </p>
            <div className="mt-7 grid gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm font-bold text-cleanora-ink">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cleanora-mint/10 text-cleanora-mint ring-1 ring-cleanora-mint/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-3xl border-slate-200/70 bg-white/80 shadow-2xl shadow-cleanora-ink/10 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-fullName">Full Name</Label>
                    <Input
                      id="contact-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="mt-2 h-12 rounded-xl border-slate-200 bg-white/90"
                      placeholder="Your name"
                    />
                    <FieldError message={errors.fullName} />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 h-12 rounded-xl border-slate-200 bg-white/90"
                      placeholder="you@example.com"
                    />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 h-12 rounded-xl border-slate-200 bg-white/90"
                    placeholder="+94 77 123 4567"
                  />
                  <FieldError message={errors.phone} />
                </div>

                <div className="mt-4">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 min-h-36 rounded-xl border-slate-200 bg-white/90"
                    placeholder="Tell us what you need help with"
                  />
                  <FieldError message={errors.message} />
                </div>

                <Button type="submit" size="lg" className="mt-6 w-full shadow-xl shadow-cleanora-ink/20 sm:w-auto">
                  Prepare Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Card className="mx-auto max-w-6xl overflow-hidden rounded-3xl border-white/10 bg-cleanora-ink text-white shadow-2xl shadow-cleanora-ink/25">
          <CardContent className="relative flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center lg:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cleanora-mint/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cleanora-mint">Quick Actions</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Ready to plan your next clean?
              </h2>
            </div>
            <div className="relative flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap md:w-auto">
              <Button asChild variant="secondary" size="lg" className="bg-white shadow-xl shadow-black/20">
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
