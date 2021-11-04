const { Schema, model } = require('mongoose');

const schema = new Schema({
    comment: { type: String, required: true },
    reviewRating: { type: Number, min: 1, max: 5, required: true },
    productId: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('Review', schema);