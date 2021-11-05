const Review = require('../models/Review');

const getAllReviews = async (productId) => {
    return await Review.find({ productId }).sort({ 'createdAt': -1 }).populate('creator');
};

const createReview = async (body) => {
    const review = new Review(body);

    await review.save();
    return review.populate('creator');
};

module.exports = {
    getAllReviews,
    createReview,
};