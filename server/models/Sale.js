const { Schema, model } = require('mongoose');

const schema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, min: 1, default: 1 },
    productOwner: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
    deliveryAddress: {
        type: Object,
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = model('Sale', schema);