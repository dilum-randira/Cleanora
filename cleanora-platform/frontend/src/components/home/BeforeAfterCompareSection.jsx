import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Compare } from '../ui/compare.jsx';
import { Button } from '../ui/button.jsx';

const proofCards = [
  'Deep cleaning transformation',
  'Stain and dust removal',
  'Fresh, sanitized finish'
];

function BeforeAfterCompareSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-cleanora-mint">Real Results</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-cleanora-ink sm:text-4xl lg:text-5xl">
            Before & After Cleaning Results
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            See how Cleanora transforms messy spaces into fresh, polished, and comfortable environments.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {proofCards.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-cleanora-porcelain p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cleanora-mint" />
                <span className="text-sm font-black text-cleanora-ink">{item}</span>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
            <Link to="/book">
              <Sparkles className="h-4 w-4" />
              Book a Cleaning
            </Link>
          </Button>
        </div>

        <div className="mx-auto w-full max-w-[620px] rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:p-4">
          <div className="relative overflow-hidden rounded-xl bg-cleanora-mist">
            <Compare
              firstImage="/images/compare/before-cleaning.jpg"
              secondImage="/images/compare/after-cleaning.jpg"
              firstImageClassName="object-cover"
              secondImageClassName="object-cover"
              className="h-[280px] w-full sm:h-[360px] lg:h-[420px]"
              slideMode="hover"
              initialSliderPercentage={50}
              showHandlebar={true}
              autoplay={false}
            />
            <div className="pointer-events-none absolute left-3 top-3 z-40 rounded-full bg-cleanora-ink/85 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg">
              Before
            </div>
            <div className="pointer-events-none absolute right-3 top-3 z-40 rounded-full bg-cleanora-mint/95 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-cleanora-ink shadow-lg">
              After
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-cleanora-ink/75 to-transparent p-4">
              <p className="text-center text-xs font-bold text-white sm:text-sm">
                Move across the image to compare before and after
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterCompareSection;
