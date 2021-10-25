const router = require('express').Router();
const { isAuthorized } = require('../middlewares/guards');

router.get('/', isAuthorized(), async (req, res) => {
    try {
        const userId = req.user._id;
        const sales = await req.data.getAllUserSales(userId);
        res.json({ ok: true, sales });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

router.patch('/:saleId/status', isAuthorized(), async (req, res) => {
    try {
        // const userId = req.user._id;
        const saleId = req.params.saleId;
        await req.data.changeSaleStatus(saleId);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// sales are created in order service on order creation
module.exports = router;