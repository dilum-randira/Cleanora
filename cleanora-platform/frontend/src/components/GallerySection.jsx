import SectionHeader from './SectionHeader.jsx';
import { Card } from './ui/card.jsx';

const galleryItems = [
  {
    label: 'Living Room Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Office Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Kitchen Deep Clean',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Bathroom Sanitization',
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Sofa Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Window Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Move-Out Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Post-Construction Cleaning',
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
  }
];

function GallerySection() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute right-10 top-24 h-72 w-72 rounded-full bg-cleanora-mint/10 blur-3xl" />
      <SectionHeader
        eyebrow="Gallery"
        title="Clean results, room by room"
        description="A polished preview of the spaces Cleanora is built to refresh, sanitize, and maintain."
      />

      <div className="relative mx-auto grid max-w-7xl gap-4 rounded-3xl border border-white/70 bg-white/60 p-3 shadow-xl shadow-cleanora-ink/5 backdrop-blur-xl sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <Card
            as="figure"
            key={item.label}
            className="group relative overflow-hidden rounded-2xl border-white/50 bg-cleanora-mist shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cleanora-ink/10"
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cleanora-ink/75 via-cleanora-ink/10 to-white/5 opacity-90 transition group-hover:opacity-75" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-12">
              <span className="text-sm font-black text-white">{item.label}</span>
            </figcaption>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
