import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="grid min-h-[55vh] place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cleanora-mint">404</p>
        <h1 className="mt-3 text-4xl font-black text-cleanora-ink">Page not found</h1>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-cleanora-ink px-6 py-4 text-sm font-bold text-white"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
