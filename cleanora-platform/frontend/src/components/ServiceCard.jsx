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
    <Card className="group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[4/3] overflow-hidden bg-cleanora-mist">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Badge variant="secondary">{service.category}</Badge>
          {service.duration && (
            <Badge variant="outline">{service.duration}</Badge>
          )}
        </div>

        <h3 className="text-xl font-black text-cleanora-ink">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4 border-t border-slate-100 p-5">
          <p className="text-lg font-black text-cleanora-ink">{formatPrice(service.price)}</p>
          <Button size="sm" asChild>
            <Link to={`/book?serviceId=${service._id}`}>Book This Service</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;
