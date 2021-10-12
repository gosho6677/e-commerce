const authController = require('../controllers/authController');
const productsController = require('../controllers/productsController');
const cartController = require('../controllers/cartController');

module.exports = app => {
    app.use('/auth', authController);
    app.use('/products', productsController);
    app.use('/cart', cartController);
};