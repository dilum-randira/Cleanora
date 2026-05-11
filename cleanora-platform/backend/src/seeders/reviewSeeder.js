import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Review from '../models/Review.js';

dotenv.config();

const defaultReviews = [
  {
    customerName: 'Anjali Perera',
    rating: 5,
    comment:
      'Cleanora transformed our apartment before a family event. The team was punctual, careful, and incredibly thorough.',
    serviceName: 'Deep Home Cleaning'
  },
  {
    customerName: 'Rizwan Fernando',
    rating: 5,
    comment:
      'Our office looks brighter and more organized after every visit. The cleaning quality is consistent and professional.',
    serviceName: 'Office Cleaning'
  },
  {
    customerName: 'Maya Silva',
    rating: 4,
    comment:
      'The sofa and carpet cleaning made a huge difference. Stains faded well and the rooms felt fresh again.',
    serviceName: 'Sofa & Carpet Cleaning'
  },
  {
    customerName: 'Tharindu Jayasena',
    rating: 5,
    comment:
      'Booked a move-out clean and the handover inspection went smoothly. Every corner was spotless.',
    serviceName: 'Move-In / Move-Out Cleaning'
  },
  {
    customerName: 'Nethmi Dias',
    rating: 4,
    comment:
      'The bathroom sanitization service was detailed and hygienic. I appreciated the attention to fixtures and tiles.',
    serviceName: 'Bathroom Sanitization'
  },
  {
    customerName: 'Michael De Silva',
    rating: 5,
    comment:
      'Post-renovation dust was everywhere, but Cleanora handled it beautifully. The space finally felt ready to use.',
    serviceName: 'Post-Construction Cleaning'
  }
];

async function seedReviews() {
  try {
    await connectDB();
    await Review.deleteMany({});
    const reviews = await Review.insertMany(defaultReviews);

    console.log(`Seeded ${reviews.length} Cleanora reviews`);
  } catch (error) {
    console.error('Review seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedReviews();
