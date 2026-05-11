import express from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  markBookingCompleted
} from '../controllers/bookingController.js';
import protectAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', protectAdmin, getAllBookings);
router.patch('/:id/complete', protectAdmin, markBookingCompleted);
router.delete('/:id', protectAdmin, deleteBooking);
router.get('/:id', protectAdmin, getBookingById);

export default router;
