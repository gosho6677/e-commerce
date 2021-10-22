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

const addToCart = async (cartId, productId, productOwner, quantity) => {
    const cart = await Cart.findById(cartId).populate({
        path: 'items',
        populate: { path: 'product' }
    });
    const product = await Product.findById(productId);

    cart.bill += Number(product.price * quantity);
    cart.items.push({
        product: product,
        productOwner,
        quantity,
    });

    await cart.save();
    return cart;
};

const deleteFromCart = async (cartId, productId) => {
    const cart = await Cart.findById(cartId).populate({
        path: 'items',
        populate: { path: 'product' }
    });

    const item = cart.items.find(x => x.product._id == productId);
    cart.bill -= Number(item.product.price * item.quantity);
    cart.items = cart.items.filter(x => x.product._id != productId);

    await cart.save();
};

module.exports = {
    getCart,
    createCart,
    addToCart,
    deleteFromCart,
};