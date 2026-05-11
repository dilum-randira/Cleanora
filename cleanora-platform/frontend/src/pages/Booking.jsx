import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { createBooking, getServices } from '../api/client.js';
import SectionHeader from '../components/SectionHeader.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select.jsx';
import { Textarea } from '../components/ui/textarea.jsx';

const initialFormData = {
  customerName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  address: '',
  notes: ''
};

function validateBookingForm(formData) {
  const errors = {};

  if (!formData.customerName.trim()) {
    errors.customerName = 'Customer name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required.';
  }

  if (!formData.service) {
    errors.service = 'Please select a cleaning service.';
  }

  if (!formData.date) {
    errors.date = 'Preferred date is required.';
  }

  if (!formData.time) {
    errors.time = 'Preferred time is required.';
  }

  if (!formData.address.trim()) {
    errors.address = 'Service address is required.';
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-xs font-semibold text-red-600">{message}</p>;
}

function Booking() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId') || '';
  const [services, setServices] = useState([]);
  const [servicesStatus, setServicesStatus] = useState('loading');
  const [servicesError, setServicesError] = useState('');
  const [formData, setFormData] = useState({ ...initialFormData, service: serviceId });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const serviceData = await getServices();

        if (isMounted) {
          setServices(serviceData);
          setServicesStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setServicesError(error.message || 'Unable to load services.');
          setServicesStatus('error');
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (serviceId) {
      setFormData((currentData) => ({ ...currentData, service: serviceId }));
    }
  }, [serviceId]);

  const selectedService = useMemo(
    () => services.find((service) => service._id === formData.service),
    [formData.service, services]
  );

  const isSubmitting = submitStatus === 'submitting';

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: ''
    }));
  }

  function handleServiceChange(value) {
    setFormData((currentData) => ({ ...currentData, service: value }));
    setFormErrors((currentErrors) => ({ ...currentErrors, service: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateBookingForm(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('error');
      toast.error('Please complete the required fields before submitting.');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const result = await createBooking(formData);

      setSubmitStatus('success');
      toast.success(result.message || 'Booking submitted successfully.');
      setFormData({ ...initialFormData, service: serviceId || '' });
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('error');
      toast.error(error.message || 'Booking submission failed. Please try again.');
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Online Booking"
        title="Schedule your Cleanora service"
        description="Choose a cleaning category, share your contact details, and submit your preferred appointment time."
      />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-lg bg-cleanora-ink p-6 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">Selected Service</p>

          {selectedService ? (
            <Card className="mt-6 overflow-hidden">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.name}
                className="h-52 w-full object-cover"
              />
              <CardContent className="p-5">
                <Badge variant="secondary">{selectedService.category}</Badge>
                <h2 className="mt-3 text-2xl font-black">{selectedService.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{selectedService.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Badge variant="outline">{selectedService.duration}</Badge>
                  <span className="text-xl font-black">
                    LKR {Number(selectedService.price).toLocaleString('en-LK')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
              Select a service from the form to preview the cleaning package here.
            </div>
          )}

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-5">
            <h3 className="font-bold">What happens next?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Your booking is saved with Pending status. Admin review and status management will be added in the next module.
            </p>
          </div>
        </aside>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
        <form onSubmit={handleSubmit}>
          {servicesStatus === 'error' && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {servicesError}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="mt-2"
                placeholder="Your full name"
              />
              <FieldError message={formErrors.customerName} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2"
                placeholder="you@example.com"
              />
              <FieldError message={formErrors.email} />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2"
                placeholder="+94 77 000 0000"
              />
              <FieldError message={formErrors.phone} />
            </div>

            <div>
              <Label>Service</Label>
              <Select
                value={formData.service}
                onValueChange={handleServiceChange}
                disabled={servicesStatus === 'loading'}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={servicesStatus === 'loading' ? 'Loading services...' : 'Select a service'} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service._id} value={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={formErrors.service} />
            </div>

            <div>
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2"
              />
              <FieldError message={formErrors.date} />
            </div>

            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2"
              />
              <FieldError message={formErrors.time} />
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="address">Service Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="mt-2"
              placeholder="House number, street, city, and any access notes"
            />
            <FieldError message={formErrors.address} />
          </div>

          <div className="mt-5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="mt-2"
              placeholder="Optional: pets, parking, special cleaning requests"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || servicesStatus !== 'success'}
            className="mt-6 w-full"
            size="lg"
          >
            {isSubmitting ? 'Submitting Booking...' : 'Submit Booking'}
          </Button>
        </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Booking;
