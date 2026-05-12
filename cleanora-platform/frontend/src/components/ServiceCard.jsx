import { Link } from 'react-router-dom';
import { Badge } from './ui/badge.jsx';
import { Button } from './ui/button.jsx';
import { Card, CardContent, CardFooter } from './ui/card.jsx';

function formatPrice(price) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0
  }).format(price);
}

function ServiceCard({ service }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-slate-200/70 bg-white/85 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cleanora-mint/60 hover:shadow-xl hover:shadow-cleanora-ink/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-cleanora-mist">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cleanora-ink/35 via-transparent to-transparent opacity-70 transition group-hover:opacity-50" />
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Badge variant="secondary" className="rounded-full bg-cleanora-mint/12 text-cleanora-ink ring-1 ring-cleanora-mint/20">
            {service.category}
          </Badge>
          {service.duration && (
            <Badge variant="outline" className="rounded-full bg-white/80">
              {service.duration}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-black text-cleanora-ink">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100/80 bg-slate-50/50 p-5">
        <p className="text-lg font-black text-cleanora-ink">{formatPrice(service.price)}</p>
        <Button size="sm" asChild>
          <Link to={`/book?serviceId=${service._id}`}>Book This Service</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;
