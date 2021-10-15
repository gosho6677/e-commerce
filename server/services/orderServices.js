const Order = require('../models/Order');
const Cart = require('../models/Cart');

const getOrders = async (userId) => {
    // nested population requried...
    const orders = await Order.find({ userId }).populate({
        path: 'cart',
        populate: {
            path: 'items',
            populate: { path: 'product' }
        }
    });
    // const orders = await Order.find({ userId }).populate({
    //     path: 'items',
    //     populate: { path: 'product' }
    // });

    return orders;
};

const createOrder = async (cartId, orderPayload) => {
    const order = new Order(orderPayload);

    await order.save();
    await Cart.findByIdAndDelete(cartId);
};

module.exports = {
    getOrders,
    createOrder,
};