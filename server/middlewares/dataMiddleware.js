const productServices = require('../services/productServices');
const cartServices = require('../services/cartServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...productServices,
        ...cartServices
    };

    next();
};