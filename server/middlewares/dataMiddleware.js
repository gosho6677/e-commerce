const productServices = require('../services/productServices');
const cartServices = require('../services/cartServices');
const orderServices = require('../services/orderServices');
const saleServices = require('../services/saleServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...productServices,
        ...cartServices,
        ...orderServices,
        ... saleServices,
    };

    next();
};