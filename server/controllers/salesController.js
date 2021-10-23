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

module.exports = router;