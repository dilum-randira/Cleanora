import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CalendarClock,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react';
import { ContainerScroll } from '../ui/container-scroll-animation.jsx';
import { Badge } from '../ui/badge.jsx';
import { Button } from '../ui/button.jsx';
import { Card, CardContent } from '../ui/card.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.jsx';
import { Textarea } from '../ui/textarea.jsx';

const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  message: ''
};

const overviewItems = [
  {
    label: 'Call Us',
    value: '+94 77 123 4567',
    icon: Phone
  },
  {
    label: 'Email Us',
    value: 'hello@cleanora.com',
    icon: Mail
  },
  {
    label: 'Visit Location',
    value: 'Colombo, Sri Lanka',
    icon: MapPin
  },
  {
    label: 'Business Hours',
    value: 'Monday - Saturday, 8:00 AM - 6:00 PM',
    icon: CalendarClock
  }
];

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

function TabletChrome({ children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 bg-cleanora-ink px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-cleanora-mint">
          Cleanora Contact Hub
        </div>
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-white text-xs font-black text-cleanora-ink">
          C
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-slate-50 p-3 md:p-5">{children}</div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid h-full min-h-0 gap-4 overflow-y-auto pr-1">
      <div className="flex flex-col justify-between gap-3 rounded-lg bg-cleanora-ink p-4 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cleanora-mint">Cleanora Services</p>
          <h3 className="mt-2 text-xl font-black">Contact dashboard</h3>
        </div>
        <Badge variant="secondary" className="w-fit">
          WhatsApp Available
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="border-slate-200">
              <CardContent className="flex gap-3 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cleanora-mist text-cleanora-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-black text-cleanora-ink">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button asChild className="w-full sm:w-fit">
        <Link to="/book">Book a Cleaning</Link>
      </Button>
    </div>
  );
}

function MapTab() {
  return (
    <div className="grid h-full min-h-0 gap-4 overflow-y-auto pr-1 lg:grid-cols-[1fr_0.38fr]">
      <div className="min-h-[16rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <iframe
          title="Cleanora Services Location Map"
          src="https://www.google.com/maps?q=Colombo%2C%20Sri%20Lanka&output=embed"
          className="h-full min-h-[16rem] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <Card className="bg-white">
        <CardContent className="p-4">
          <Badge variant="secondary">Colombo, Sri Lanka</Badge>
          <h3 className="mt-4 text-xl font-black text-cleanora-ink">Cleanora Services Location</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Serving homes, apartments, offices, and post-renovation spaces across the Colombo area.
          </p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Ask for Directions
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MessageTab() {
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
    <form onSubmit={handleSubmit} className="h-full min-h-0 overflow-y-auto pr-1">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="tablet-fullName">Full Name</Label>
          <Input
            id="tablet-fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1.5"
            placeholder="Your name"
          />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <Label htmlFor="tablet-email">Email</Label>
          <Input
            id="tablet-email"
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

      <div className="mt-3">
        <Label htmlFor="tablet-phone">Phone</Label>
        <Input
          id="tablet-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1.5"
          placeholder="+94 77 123 4567"
        />
        <FieldError message={errors.phone} />
      </div>

      <div className="mt-3">
        <Label htmlFor="tablet-message">Message</Label>
        <Textarea
          id="tablet-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="mt-1.5 min-h-24 md:min-h-32"
          placeholder="Tell us what you need help with"
        />
        <FieldError message={errors.message} />
      </div>

      <Button type="submit" className="mt-4 w-full">
        Prepare Message
      </Button>
    </form>
  );
}

function ContactTabletDashboard() {
  return (
    <TabletChrome>
      <Tabs defaultValue="overview" className="flex h-full min-h-0 flex-col">
        <TabsList className="grid h-auto w-full grid-cols-3 bg-white p-1 shadow-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="message">Message</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 min-h-0 flex-1 overflow-hidden">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="map" className="mt-4 min-h-0 flex-1 overflow-hidden">
          <MapTab />
        </TabsContent>
        <TabsContent value="message" className="mt-4 min-h-0 flex-1 overflow-hidden">
          <MessageTab />
        </TabsContent>
      </Tabs>
    </TabletChrome>
  );
}

function ContactTabletShowcase() {
  return (
    <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-cleanora-porcelain to-white">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cleanora-mint">
              Contact & Location
            </p>
            <h2 className="mx-auto mt-4 max-w-[18rem] break-words text-2xl font-black leading-tight text-cleanora-ink sm:max-w-4xl sm:text-4xl md:text-6xl">
              Reach Cleanora Faster
              <br />
              <span className="text-cleanora-mint">Inside One Smart Contact Hub</span>
            </h2>
          </>
        }
      >
        <ContactTabletDashboard />
      </ContainerScroll>
    </div>
  );
}

export default ContactTabletShowcase;
