import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CalendarClock,
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
    <div className="overflow-hidden">
      <section className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
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

      <ContactMapDeviceShowcase />

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

      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cleanora-mint">Send a Message</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-cleanora-ink sm:text-4xl">
              Tell us what you need cleaned
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Share a few details and the Cleanora team will help you choose the right package, schedule, and next step.
            </p>
          </div>

          <Card className="shadow-soft">
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
                      className="mt-1.5"
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
                      className="mt-1.5"
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
                    className="mt-1.5"
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
                    className="mt-1.5 min-h-32"
                    placeholder="Tell us what you need help with"
                  />
                  <FieldError message={errors.message} />
                </div>

                <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                  Prepare Message
                </Button>
              </form>
            </CardContent>
          </Card>
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
