const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, minlength: 5 },
    category: { type: String, enum: ['phone', 'laptop', 'tablet'], required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('Product', schema);