import Review from '../models/Review.js';

export async function getAllReviews(_req, res, next) {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    return next(error);
  }
}

export async function createReview(req, res, next) {
  try {
    const review = await Review.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return next(error);
  }
}
