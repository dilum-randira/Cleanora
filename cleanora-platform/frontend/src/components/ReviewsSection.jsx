import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getReviews } from '../api/client.js';
import SectionHeader from './SectionHeader.jsx';
import { Card, CardContent } from './ui/card.jsx';
import { Skeleton } from './ui/skeleton.jsx';

function RatingStars({ rating }) {
  return (
    <div className="flex gap-1 text-sm text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? 'fill-amber-500' : 'fill-none text-slate-300'}`}
        />
      ))}
    </div>
  );
}

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const reviewData = await getReviews();

        if (isMounted) {
          setReviews(reviewData);
          setStatus('success');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load reviews.');
          setStatus('error');
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-cleanora-mint/10 blur-3xl" />
      <SectionHeader
        eyebrow="Reviews"
        title="Trusted by careful homeowners and teams"
        description="Customer feedback is loaded from the Cleanora backend so reviews can grow with the platform."
      />

      {status === 'loading' && (
        <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="mt-5 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="text-lg font-bold text-red-700">Reviews could not be loaded</h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {status === 'success' && reviews.length === 0 && (
        <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-8 text-center">
          <h3 className="text-xl font-black text-cleanora-ink">No reviews yet</h3>
          <p className="mt-3 text-sm text-slate-600">Run the review seeder to add starter customer feedback.</p>
        </div>
      )}

      {status === 'success' && reviews.length > 0 && (
        <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review._id}
              className="group h-full rounded-2xl border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cleanora-mint/40 hover:shadow-xl hover:shadow-cleanora-ink/10"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-cleanora-ink">{review.customerName}</h3>
                    {review.serviceName && (
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-cleanora-mint">
                        {review.serviceName}
                      </p>
                    )}
                  </div>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReviewsSection;
