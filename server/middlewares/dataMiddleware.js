const productServices = require('../services/productServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...productServices,
    };

    next();
};