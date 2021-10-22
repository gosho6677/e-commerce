const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Sale = require('../models/Sale');

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

    // adjust each product to meet sale model requirements
    const deliveryAddress = orderPayload.shippingAddress;
    const sales = orderPayload.cart.items.map(x => {
        x.status = 'pending';
        x.deliveryAddress = deliveryAddress;
        return x;
    });

    await Promise.all([order.save(), Cart.findByIdAndDelete(cartId), Sale.insertMany(sales)]);
};

module.exports = {
    getOrders,
    createOrder,
};