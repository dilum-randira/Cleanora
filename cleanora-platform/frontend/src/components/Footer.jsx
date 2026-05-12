import { Link } from 'react-router-dom';
import { Button } from './ui/button.jsx';

const quickLinks = [
  ['Home', '/'],
  ['Services', '/#services'],
  ['Gallery', '/#gallery'],
  ['Reviews', '/#reviews'],
  ['Contact', '/contact']
];

const serviceLinks = [
  'Deep Home Cleaning',
  'Office Cleaning',
  'Sofa & Carpet Cleaning',
  'Move-In Cleaning'
];

function Footer() {
  return (
    <footer className="bg-cleanora-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.85fr_1fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-black">Cleanora Services</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Premium residential and commercial cleaning with a polished digital booking experience.
          </p>
          <Button asChild variant="secondary" className="mt-6 bg-white shadow-xl shadow-black/10">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {quickLinks.map(([label, to]) => (
              <Link key={to} to={to} className="transition hover:text-cleanora-mint">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">Services</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {serviceLinks.map((service) => (
              <Link key={service} to="/#services" className="transition hover:text-cleanora-mint">
                {service}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">Contact</h3>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            <p>Colombo, Sri Lanka</p>
            <p>hello@cleanora.com</p>
            <p>+94 77 123 4567</p>
            <p>Monday - Saturday, 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        (c) 2026 Cleanora Services. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
