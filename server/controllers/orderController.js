const router = require('express').Router();
const { isAuthorized } = require('../middlewares/guards');


router.get('/', isAuthorized(), async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await req.data.getOrders(userId);
        res.json({ ok: true, orders });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

router.post('/', isAuthorized(), async (req, res) => {
    try {
        const cartId = req.body.cartId;
        const order = req.body.order;
        const userId = req.user._id;

        order.userId = userId;

        if(!cartId || !order) {
            throw new Error('All data is required!');
        }

        await req.data.createOrder(cartId, order);
        res.status(201).json({ ok: true });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

module.exports = router;