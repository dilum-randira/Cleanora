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
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cleanora-ink text-lg font-black text-white">
              C
            </span>
            <span>
              <span className="block text-lg font-bold leading-5 text-cleanora-ink">Cleanora</span>
              <span className="block text-xs font-medium text-slate-500">Premium cleaning care</span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? 'text-cleanora-mint' : 'text-slate-600 hover:text-cleanora-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-2 py-2 text-center text-xs font-bold transition ${
                  isActive ? 'bg-cleanora-mist text-cleanora-ink' : 'text-slate-500 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
