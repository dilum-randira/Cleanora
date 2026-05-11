import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';

dotenv.config();

const defaultServices = [
  {
    name: 'Deep Home Cleaning',
    description:
      'A detailed top-to-bottom refresh for bedrooms, living areas, floors, surfaces, and hard-to-reach corners.',
    price: 12500,
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    category: 'Residential',
    duration: '4-6 hours'
  },
  {
    name: 'Office Cleaning',
    description:
      'Reliable workspace cleaning for desks, meeting rooms, reception areas, shared kitchens, and washrooms.',
    price: 18000,
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    category: 'Commercial',
    duration: '3-5 hours'
  },
  {
    name: 'Sofa & Carpet Cleaning',
    description:
      'Fabric-safe cleaning for sofas, rugs, and carpets to remove dust, stains, odors, and daily buildup.',
    price: 9500,
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    category: 'Specialized',
    duration: '2-4 hours'
  },
  {
    name: 'Kitchen Cleaning',
    description:
      'Focused kitchen care for countertops, sinks, cabinet fronts, appliance exteriors, tiles, and grease-prone zones.',
    price: 8500,
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    category: 'Residential',
    duration: '2-3 hours'
  },
  {
    name: 'Bathroom Sanitization',
    description:
      'Hygienic bathroom sanitization for toilets, showers, sinks, mirrors, fixtures, tiles, and high-touch surfaces.',
    price: 7000,
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    category: 'Sanitization',
    duration: '1-2 hours'
  },
  {
    name: 'Move-In / Move-Out Cleaning',
    description:
      'A complete property reset for empty homes, apartments, and rental units before moving in or handing over keys.',
    price: 22000,
    imageUrl:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    category: 'Residential',
    duration: '5-7 hours'
  },
  {
    name: 'Window Cleaning',
    description:
      'Interior window and glass cleaning for clearer views, brighter rooms, and a more polished finish.',
    price: 6000,
    imageUrl:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    category: 'Specialized',
    duration: '1-3 hours'
  },
  {
    name: 'Post-Construction Cleaning',
    description:
      'Heavy-duty cleaning for renovated or newly built spaces, including dust removal, debris cleanup, and surface detailing.',
    price: 28000,
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    category: 'Commercial',
    duration: '6-8 hours'
  }
];

async function seedServices() {
  try {
    await connectDB();
    await Service.deleteMany({});
    const services = await Service.insertMany(defaultServices);

    console.log(`Seeded ${services.length} Cleanora services`);
  } catch (error) {
    console.error('Service seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedServices();
