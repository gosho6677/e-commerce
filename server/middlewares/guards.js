const isAuthorized = () => (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({ ok: false, error: 'Please log in or register first.' });
    }
    next();
};

const isGuest = () => (req, res, next) => {
    if(req.user) {
        return res.status(409).json({ ok: false, error: 'You are already logged in.' });
    }
    next();
};

module.exports = {
    isAuthorized,
    isGuest,
};