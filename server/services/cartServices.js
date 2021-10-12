const Cart = require('../models/Cart');

const getCart = async userId => {
    const cart = await Cart.findOne({ userId });
    return cart;
};

const createCart = async userId => {
    const cart = new Cart({ userId });
    await cart.save();

    return cart;
};

module.exports = {
    getCart,
    createCart,
};