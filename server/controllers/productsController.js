const router = require('express').Router();
const { isAuthorized, isOwner } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    try {
        const products = await req.data.getAllProducts();
        res.json({ ok: true, products });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

router.post('/', isAuthorized(), createEditAction('create'));
router.put('/edit/:productId', isOwner(), createEditAction('edit'));

router.delete('/:productId', isOwner(), async (req, res) => {
    try {
        let productId = req.params.productId;
        await req.data.deleteProduct(productId);

        res.json({ ok: true });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.get('/reviews/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await req.data.getAllReviews(productId);
        res.json({ ok: true, reviews });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

router.post('/reviews/:productId', isAuthorized(), async (req, res) => {
    try {
        let productId = req.params.productId;
        let creator = req.user._id;
        let { comment, reviewRating } = req.body;

        if (!comment || (reviewRating < 0 || reviewRating > 5)) {
            throw new Error('Please provide correct data for review!');
        }

        const review = await req.data.createReview({ comment, reviewRating, productId, creator });
        res.json({ ok: true, review });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

function createEditAction(type) {
    return async function (req, res) {
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

            let product;

            if (type === 'create') {
                product = await req.data.createProduct({
                    name,
                    description,
                    price,
                    imageUrl,
                    category,
                    creatorId: req.user._id
                });
            } else {
                let productId = req.params.productId;
                product = await req.data.editProduct({
                    name,
                    description,
                    price,
                    imageUrl,
                    category,
                }, productId);
            }

            res.status(201).json({ ok: true, product });
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    };
}

module.exports = router;