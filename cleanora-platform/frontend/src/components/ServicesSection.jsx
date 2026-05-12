import { useEffect, useState } from 'react';
import { getServices } from '../api/client.js';
import LampSectionHeader from './common/LampSectionHeader.jsx';
import ServiceCard from './ServiceCard.jsx';
import { Card, CardContent } from './ui/card.jsx';
import { Skeleton } from './ui/skeleton.jsx';

function ServicesSection() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const serviceData = await getServices();

        if (isMounted) {
          setServices(serviceData);
          setStatus('success');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load services');
          setStatus('error');
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services" className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-cleanora-mint/10 blur-3xl" />
      <LampSectionHeader
        eyebrow="SERVICES"
        title="Service menu"
        highlight="Professional cleaning, one click away"
        description="Cleaning categories are loaded dynamically from the Cleanora backend."
      />

      {status === 'loading' && (
        <div className="relative mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="aspect-[4/3]" />
                <Skeleton className="mt-5 h-5 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="text-lg font-bold text-red-700">Services could not be loaded</h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {status === 'success' && services.length === 0 && (
        <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-cleanora-porcelain p-8 text-center">
          <h3 className="text-xl font-black text-cleanora-ink">No services available yet</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Run the service seeder to add the default Cleanora cleaning menu.
          </p>
        </div>
      )}

      {status === 'success' && services.length > 0 && (
        <div className="relative mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ServicesSection;
