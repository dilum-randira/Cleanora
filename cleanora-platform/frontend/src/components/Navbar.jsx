import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/button.jsx';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin', to: '/admin/login' }
];

function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setHasScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200/70 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/80 shadow-[0_16px_40px_rgba(20,33,61,0.10)] backdrop-blur-xl'
          : 'bg-white/95 shadow-none backdrop-blur'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 rounded-xl transition-opacity hover:opacity-90"
            aria-label="Cleanora home"
          >
            <img
              src="/images/cleanora-logo.svg"
              alt=""
              className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-sm"
            />
            <span>
              <span className="block text-lg font-bold leading-5 text-cleanora-ink">Cleanora</span>
              <span className="block text-xs font-medium text-slate-500">Premium cleaning care</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full bg-cleanora-mist/60 p-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? 'bg-white text-cleanora-ink shadow-sm ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:bg-white/70 hover:text-cleanora-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Button size="sm" asChild className="hidden shadow-sm sm:inline-flex">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2.5 text-center text-xs font-bold transition duration-200 ${
                  isActive
                    ? 'bg-cleanora-mist text-cleanora-ink ring-1 ring-cleanora-mint/20'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-cleanora-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Button size="sm" asChild className="mt-3 w-full sm:hidden">
          <Link to="/book">Book Now</Link>
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
