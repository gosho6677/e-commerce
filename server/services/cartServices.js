const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async userId => {
    // nested population required to get products info from items arr
    const cart = await Cart.findOne({ userId }).populate({
        path: 'items',
        populate: { path: 'product' }
    });

    return cart;
};

const createCart = async userId => {
    const cart = new Cart({ userId });
    await cart.save();

    return cart;
};

const addToCart = async (cartId, productId, quantity) => {
    const cart = await Cart.findById(cartId).populate({
        path: 'items',
        populate: { path: 'product' }
    });;
    const product = await Product.findById(productId);

    cart.bill += Number(product.price * quantity);
    cart.items.push({
        product: product,
        quantity,
    });

    await cart.save();
    return cart;
};

module.exports = {
    getCart,
    createCart,
    addToCart,
};