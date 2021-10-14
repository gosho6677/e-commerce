const productServices = require('../services/productServices');
const cartServices = require('../services/cartServices');
const orderServices = require('../services/orderServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...productServices,
        ...cartServices,
        ...orderServices,
    };

    next();
};