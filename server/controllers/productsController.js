const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAuthorized } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    // const posts = await req.data.getAllPosts(query);
    res.json({ ok: true, posts });
});

router.post('/',
    isAuthorized(),
    body('title', 'Title must be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 10 characters long.').isLength({ min: 10 }),
    body('imageUrl', 'Image URL must be a valid URL.').isURL(),
    async (req, res) => {
        const { errors } = validationResult(req);
        const time = Date.now();

        const info = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            owner: req.user._id,
            iat: time,
            unixTime: time,
        };

        try {
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            // const post = await req.data.createPost(info);
            res.status(201).json({ ok: true, post });
        } catch (err) {
            res.status(400).json({ ok: false, error: err.message });
        }
    });

module.exports = router;