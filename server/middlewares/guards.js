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

const isOwner = () => async (req, res, next) => {
    let productId = req.params.productId;
    let product = await req.data.getProductById(productId);
    
    if(req.user && product && (req.user._id == product.creatorId)) {
        // preloading product to avoid duplicated requests for future use
        req.product = product;
        next();
    } else {
        return res.status(401).json({ ok: false, error: 'Unauthorized request.' });
    }
};

module.exports = {
    isAuthorized,
    isGuest,
    isOwner,
};