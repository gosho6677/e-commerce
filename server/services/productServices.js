const Product = require('../models/Product');

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
    return await Product.findByIdAndDelete(productId);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
};