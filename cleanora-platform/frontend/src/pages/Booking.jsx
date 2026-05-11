import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createBooking, getServices } from '../api/client.js';
import SectionHeader from '../components/SectionHeader.jsx';

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
  const [submitMessage, setSubmitMessage] = useState('');

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
    setSubmitMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateBookingForm(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('error');
      setSubmitMessage('Please complete the required fields before submitting.');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      const result = await createBooking(formData);

      setSubmitStatus('success');
      setSubmitMessage(result.message || 'Booking submitted successfully.');
      setFormData({ ...initialFormData, service: serviceId || '' });
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Booking submission failed. Please try again.');
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
            <div className="mt-6 overflow-hidden rounded-lg bg-white text-cleanora-ink">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cleanora-mint">
                  {selectedService.category}
                </p>
                <h2 className="mt-2 text-2xl font-black">{selectedService.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{selectedService.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-slate-500">{selectedService.duration}</span>
                  <span className="text-xl font-black">
                    LKR {Number(selectedService.price).toLocaleString('en-LK')}
                  </span>
                </div>
              </div>
            </div>
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

        <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          {servicesStatus === 'error' && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {servicesError}
            </div>
          )}

          {submitMessage && (
            <div
              className={`mb-6 rounded-lg border p-4 text-sm font-semibold ${
                submitStatus === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Customer Name</span>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
                placeholder="Your full name"
              />
              <FieldError message={formErrors.customerName} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
                placeholder="you@example.com"
              />
              <FieldError message={formErrors.email} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
                placeholder="+94 77 000 0000"
              />
              <FieldError message={formErrors.phone} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Service</span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={servicesStatus === 'loading'}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">
                  {servicesStatus === 'loading' ? 'Loading services...' : 'Select a service'}
                </option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <FieldError message={formErrors.service} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Preferred Date</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
              />
              <FieldError message={formErrors.date} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-cleanora-ink">Preferred Time</span>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
              />
              <FieldError message={formErrors.time} />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-cleanora-ink">Service Address</span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
              placeholder="House number, street, city, and any access notes"
            />
            <FieldError message={formErrors.address} />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-cleanora-ink">Notes</span>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cleanora-mint focus:ring-4 focus:ring-cleanora-mint/10"
              placeholder="Optional: pets, parking, special cleaning requests"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting || servicesStatus !== 'success'}
            className="mt-6 w-full rounded-lg bg-cleanora-ink px-6 py-4 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-cleanora-charcoal disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Submitting Booking...' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;
