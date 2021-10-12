const { isAuthorized } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/', isAuthorized(), async (req, res) => {
    try {
        const userId = req.user._id;
        let cart = await req.data.getCart(userId);
        if(!cart) {
            cart = await req.data.createCart(userId);
        }

        res.json({ ok: true, cart });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

router.post('/:cartId', isAuthorized(), async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        if(quantity < 1) {
            throw new Error('Quantity must be a positive integer!');
        }
        const cart = await req.data.addToCart(cartId, productId, quantity);
        res.json({ ok: true, cart });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

module.exports = router;