const router = require('express').Router();
const { isGuest, isAuthorized } = require('../middlewares/guards');

router.get('/refresh', isAuthorized(), async (req, res) => {
    try {
        let token = await req.auth.createToken(req.user);
        res.status(201).json({ ok: true, token });
    } catch (err) {
        console.error(err);
    } 
});

router.post('/register', isGuest(), async (req, res) => {
    const errors = [];

    try {
        let { email, password, imageUrl } = req.body;
        if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(email)) {
            errors.push('Please provide a correct email.');
        }
        if (password.length < 3) {
            errors.push('Password must be atleast 3 characters long!');
        }
        if (errors.length) {
            throw new Error(errors.join('\n'));
        }

        await req.auth.register(email, password, imageUrl);
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        let { email, password } = req.body;

        await req.auth.login(email, password);
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.get('/logout', isAuthorized(), async (req, res) => {
    try {
        await req.auth.logout();
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

module.exports = router;