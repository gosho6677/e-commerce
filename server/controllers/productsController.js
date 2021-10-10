const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAuthorized } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    try {
        const products = await req.data.getAllProducts();
        res.json({ ok: true, products });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

router.post('/',
    isAuthorized(),
    body('name', 'Title must be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long.').isLength({ min: 5 }),
    body('price').custom(val => {
        if (val < 0) {
            throw new Error('Price must be greater than 0!');
        }
        return true;
    }),
    body('imageUrl', 'Image URL must be a valid URL.').isURL(),
    async (req, res) => {
        const { errors } = validationResult(req);

        const payload = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            category: req.body.category,
        };

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            const product = await req.data.createProduct(payload);
            res.status(201).json({ ok: true, product });
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });

module.exports = router;