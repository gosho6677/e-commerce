const router = require('express').Router();
const { isAuthorized } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    try {
        const products = await req.data.getAllProducts();
        res.json({ ok: true, products });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

router.post('/', isAuthorized(), async (req, res) => {
    const errors = [];

    try {
        let {
            name,
            description,
            price,
            imageUrl,
            category
        } = req.body;

        if (!name || name.length < 3) {
            errors.push('Title must be atleast 3 characters long.');
        }
        if (!description || description.lenth < 5) {
            errors.push('Description must be atleast 5 characters long.');
        }
        if (price <= 0) {
            errors.push('Price must be greater than 0!');
        }
        if (!/https?:\/\//.test(imageUrl)) {
            // lame regex test must fix later
            errors.push('Image URL must be a valid URL.');
        }
        if (!category) {
            errors.push('Category must be selected!');
        }

        if (errors.length) {
            throw new Error(errors.join('\n'));
        }
        const product = await req.data.createProduct({
            name,
            description,
            price,
            imageUrl,
            category,
            creatorId: req.user._id
        });
        res.status(201).json({ ok: true, product });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

module.exports = router;