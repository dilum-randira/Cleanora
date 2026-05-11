function Footer() {
  return (
    <footer className="bg-cleanora-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-bold">Cleanora</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            A premium cleaning service platform foundation for residential and commercial bookings.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>Colombo, Sri Lanka</p>
            <p>hello@cleanora.com</p>
            <p>+94 77 000 0000</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cleanora-mint">Map Preview</h3>
          <div className="mt-4 grid h-32 place-items-center rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300">
            Google Map embed placeholder
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 Cleanora. Built for a future 3D cleaning service booking platform.
      </div>
    </footer>
  );
}

export default Footer;
