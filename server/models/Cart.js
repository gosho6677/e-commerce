const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: { type: String, required: true },
    items: [{
        productOwner: { type: Schema.Types.ObjectId, ref: 'User' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: {
            type: Number,
            min: 1,
            default: 1
        }
    }],
    bill: { type: Number, default: 0 }
});

module.exports = model('Cart', schema);