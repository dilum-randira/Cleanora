import { Link } from 'react-router-dom';

function formatPrice(price) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0
  }).format(price);
}

function ServiceCard({ service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[4/3] overflow-hidden bg-cleanora-mist">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-lg bg-cleanora-mist px-3 py-1 text-xs font-bold text-cleanora-ink">
            {service.category}
          </span>
          {service.duration && (
            <span className="text-xs font-semibold text-slate-500">{service.duration}</span>
          )}
        </div>

        <h3 className="text-xl font-black text-cleanora-ink">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <p className="text-lg font-black text-cleanora-ink">{formatPrice(service.price)}</p>
          <Link
            to={`/book?serviceId=${service._id}`}
            className="rounded-lg bg-cleanora-ink px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-cleanora-charcoal"
          >
            Book This Service
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
