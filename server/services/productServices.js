const Product = require('../models/Product');
const Review = require('../models/Review');

const getAllProducts = async () => {
    return await Product.find({});
};

const getProductById = async (productId) => {
    return await Product.findById(productId);
};

const createProduct = async (payload) => {
    const product = new Product(payload);

    await product.save();
    return product;
};

const editProduct = async (payload, productId) => {
    return await Product.findByIdAndUpdate(productId, payload, { new: true });
};

const deleteProduct = async (productId) => {
    // delete product and its reviews!
    return await Promise.all([Product.findByIdAndDelete(productId), Review.deleteMany({ productId })]);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
};