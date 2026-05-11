import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const requiredBookingFields = ['customerName', 'email', 'phone', 'service', 'date', 'time', 'address'];
const servicePopulateFields = 'name description price imageUrl category duration';

function getMissingFields(body) {
  return requiredBookingFields.filter((field) => !body[field] || String(body[field]).trim() === '');
}

export async function createBooking(req, res, next) {
  try {
    const missingFields = getMissingFields(req.body);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.service)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID'
      });
    }

    const selectedService = await Service.findById(req.body.service);

    if (!selectedService) {
      return res.status(404).json({
        success: false,
        message: 'Selected service does not exist'
      });
    }

    const booking = await Booking.create({
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      address: req.body.address,
      notes: req.body.notes
    });

    const populatedBooking = await booking.populate('service', servicePopulateFields);

    return res.status(201).json({
      success: true,
      message: 'Booking submitted successfully',
      data: populatedBooking
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return next(error);
  }
}

export async function getAllBookings(_req, res, next) {
  try {
    const bookings = await Booking.find()
      .populate('service', servicePopulateFields)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    return next(error);
  }
}

export async function getBookingById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    const booking = await Booking.findById(id).populate('service', servicePopulateFields);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    return next(error);
  }
}

export async function markBookingCompleted(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: 'Completed' },
      { new: true, runValidators: true }
    ).populate('service', servicePopulateFields);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking marked as completed',
      data: booking
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteBooking(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID'
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    return next(error);
  }
}
