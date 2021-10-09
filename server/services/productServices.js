const Product = require('../models/Product');

const getAllProducts = async () => {
    return await Product.find({});
};

const createProduct = async (payload) => {
    const product = new Product(payload);
    
    await product.save();
    return product;
};

module.exports = {
    getAllProducts,
    createProduct,
};