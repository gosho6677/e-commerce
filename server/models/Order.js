const { Schema, model } = require('mongoose');

const schema = new Schema({
    cart: {
        userId: { type: String, required: true },
        items: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }],
        bill: { type: Number, default: 0 },
        added: { type: String, required: true }
    },
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true }
    }
});

module.exports = model('Order', schema);