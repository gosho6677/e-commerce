const Review = require('../models/Review');

const getAllReviews = async (productId) => {
    return await Review.find({ productId }).populate('creator');
};

const createReview = async (body) => {
    const review = new Review(body);

    await review.save();
    return review;
};

module.exports = {
    getAllReviews,
    createReview,
};