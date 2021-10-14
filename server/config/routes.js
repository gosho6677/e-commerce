const authController = require('../controllers/authController');
const productsController = require('../controllers/productsController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

module.exports = app => {
    app.use('/auth', authController);
    app.use('/products', productsController);
    app.use('/cart', cartController);
    app.use('/orders', orderController);
};