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
    <section id="gallery" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Gallery"
        title="Clean results, room by room"
        description="A polished preview of the spaces Cleanora is built to refresh, sanitize, and maintain."
      />

      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <Card
            as="figure"
            key={item.label}
            className="group relative overflow-hidden rounded-lg bg-cleanora-mist shadow-sm"
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cleanora-ink/85 to-transparent p-4 pt-12">
              <span className="text-sm font-black text-white">{item.label}</span>
            </figcaption>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
