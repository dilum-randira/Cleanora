import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

dotenv.config();

const demoCustomers = [
  {
    customerName: 'Nuwan Perera',
    email: 'nuwan.demo@cleanora.com',
    phone: '0771234561',
    address: 'No. 24, Galle Road, Dehiwala',
    date: '2026-05-24',
    time: '09:00',
    status: 'Pending',
    createdAt: '2026-05-14T04:15:00.000Z',
    notes: '[DEMO] General home cleaning before family visit.'
  },
  {
    customerName: 'Anjali Fernando',
    email: 'anjali.demo@cleanora.com',
    phone: '0712345672',
    address: 'No. 12, Temple Road, Colombo 07',
    date: '2026-05-25',
    time: '10:30',
    status: 'Completed',
    createdAt: '2026-05-15T05:45:00.000Z',
    notes: '[DEMO] Completed apartment refresh after renovation dust.'
  },
  {
    customerName: 'Kasun Jayasinghe',
    email: 'kasun.demo@cleanora.com',
    phone: '0763456783',
    address: 'No. 88, Kandy Road, Kadawatha',
    date: '2026-05-26',
    time: '14:00',
    status: 'Pending',
    createdAt: '2026-05-16T08:20:00.000Z',
    notes: '[DEMO] Needs extra attention for living room and pantry.'
  },
  {
    customerName: 'Tharushi Silva',
    email: 'tharushi.demo@cleanora.com',
    phone: '0754567894',
    address: 'No. 45, Lake Road, Boralesgamuwa',
    date: '2026-05-27',
    time: '11:00',
    status: 'Completed',
    createdAt: '2026-05-17T06:10:00.000Z',
    notes: '[DEMO] Completed before weekend guests arrived.'
  },
  {
    customerName: 'Dilan Madushanka',
    email: 'dilan.demo@cleanora.com',
    phone: '0725678905',
    address: 'No. 9, High Level Road, Maharagama',
    date: '2026-05-28',
    time: '15:30',
    status: 'Pending',
    createdAt: '2026-05-18T10:30:00.000Z',
    notes: '[DEMO] Customer requested cleaning supplies with mild fragrance.'
  },
  {
    customerName: 'Chamodi Wickramasinghe',
    email: 'chamodi.demo@cleanora.com',
    phone: '0786789016',
    address: 'No. 31, Station Road, Nugegoda',
    date: '2026-05-29',
    time: '08:30',
    status: 'Pending',
    createdAt: '2026-05-19T03:55:00.000Z',
    notes: '[DEMO] Morning slot preferred due to office schedule.'
  },
  {
    customerName: 'Ravindu Gunasekara',
    email: 'ravindu.demo@cleanora.com',
    phone: '0707890127',
    address: 'No. 17, Main Street, Negombo',
    date: '2026-05-30',
    time: '13:00',
    status: 'Completed',
    createdAt: '2026-05-20T07:40:00.000Z',
    notes: '[DEMO] Completed cleaning for small office space.'
  },
  {
    customerName: 'Ishara Bandara',
    email: 'ishara.demo@cleanora.com',
    phone: '0748901238',
    address: 'No. 66, Peradeniya Road, Kandy',
    date: '2026-05-31',
    time: '16:00',
    status: 'Pending',
    createdAt: '2026-05-21T09:25:00.000Z',
    notes: '[DEMO] Customer asked team to call before arrival.'
  },
  {
    customerName: 'Sachini Dias',
    email: 'sachini.demo@cleanora.com',
    phone: '0779012349',
    address: 'No. 5, Beach Road, Mount Lavinia',
    date: '2026-06-01',
    time: '09:30',
    status: 'Completed',
    createdAt: '2026-05-22T04:50:00.000Z',
    notes: '[DEMO] Completed seaside apartment deep clean.'
  },
  {
    customerName: 'Lahiru Senanayake',
    email: 'lahiru.demo@cleanora.com',
    phone: '0710123450',
    address: 'No. 102, New Kandy Road, Malabe',
    date: '2026-06-02',
    time: '12:00',
    status: 'Pending',
    createdAt: '2026-05-23T06:35:00.000Z',
    notes: '[DEMO] Midday booking for family home cleaning.'
  }
];

async function seedBookings() {
  try {
    await connectDB();

    const services = await Service.find({}).sort({ createdAt: 1 });

    if (services.length === 0) {
      console.error('No services found. Please run npm run seed:services first.');
      process.exitCode = 1;
      return;
    }

    const deleteResult = await Booking.deleteMany({
      notes: { $regex: '^\\[DEMO\\]' }
    });

    console.log(`Removed old demo bookings count: ${deleteResult.deletedCount}`);

    const demoBookings = demoCustomers.map((customer, index) => ({
      ...customer,
      service: services[index % services.length]._id,
      date: new Date(`${customer.date}T00:00:00.000Z`),
      createdAt: new Date(customer.createdAt),
      updatedAt: new Date(customer.createdAt)
    }));

    const bookings = await Booking.insertMany(demoBookings);
    const pendingCount = bookings.filter((booking) => booking.status === 'Pending').length;
    const completedCount = bookings.filter((booking) => booking.status === 'Completed').length;

    console.log(`Inserted ${bookings.length} demo bookings`);
    console.log(`Pending count: ${pendingCount}`);
    console.log(`Completed count: ${completedCount}`);
  } catch (error) {
    console.error('Booking seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedBookings();
