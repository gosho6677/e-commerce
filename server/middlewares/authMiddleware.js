const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authServices = require('../services/authServices');

const { TOKEN_SECRET } = require('../config');

const tokenBlackList = [];

module.exports = () => async (req, res, next) => {
    req.auth = {
        createToken,
        register: async (email, password, imageUrl = '') => {
            let emailInDb = await authServices.getUserByEmail(email);
            if (emailInDb) {
                throw new Error('Email is already taken.');
            }

            const { token, refreshToken } = await registerToken(email, password, imageUrl);
            res.status(201).json({ ok: true, token, refreshToken });
        },
        login: async (email, password) => {
            const emailInDb = await authServices.getUserByEmail(email);
            if (!emailInDb) {
                throw new Error('Wrong email or password!');
            }

            const { token, refreshToken } = await loginToken(email, password);
            res.json({ ok: true, token, refreshToken });
        },
        logout: () => {
            tokenBlackList.push(req.headers['authorization']);
            console.log(`Token ${req.headers['authorization'].slice(0, 25)}... blacklisted. ${tokenBlackList.length} total.`);
            res.json({ ok: true });
        },
    };
    let tokenVerificationMessage = await verifyToken(req);
    // console.log(tokenVerificationMessage);
    if (tokenVerificationMessage === true) {
        next();
    } else if (tokenVerificationMessage === 'Access token expired!') {
        return res.status(412).json({ ok: false, error: 'Access token expired!' });
    } else {
        return res.status(401).json({ ok: false, error: 'Session expired! Please try logging in again!' });
    }
    // if (await verifyToken(req)) {
    //     next();
    // } else {
    //     res.status(401).json({ ok: false, error: 'Session expired! Please try logging in again!' });
    // }
};

async function registerToken(email, password, imageUrl = '') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authServices.createUser(email, hashedPassword, imageUrl);
    return {
        token: await createToken(user),
        refreshToken: await createRefreshToken(user),
    };
}

async function loginToken(email, password) {
    const user = await authServices.getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password.');
    }

    return {
        token: await createToken(user),
        refreshToken: await createRefreshToken(user),
    };
}

function createRefreshToken(user) {
    const userViewModel = {
        _id: user._id,
        email: user.email
    };

    if (user.imageUrl) {
        userViewModel.imageUrl = user.imageUrl;
    }

    return new Promise((resolve, reject) => {
        jwt.sign(userViewModel, TOKEN_SECRET, { expiresIn: '12h' }, (err, token) => {
            // jwt.sign(userViewModel, TOKEN_SECRET, { expiresIn: '5000' }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

function createToken(user) {
    // TODO: adjust code to not use email from this token
    const userViewModel = {
        _id: user._id,
        email: user.email
    };

    if (user.imageUrl) {
        userViewModel.imageUrl = user.imageUrl;
    }

    return new Promise((resolve, reject) => {
        // measured in seconds (3 minutes untill access token expires)
        jwt.sign(userViewModel, TOKEN_SECRET, { expiresIn: 60 * 3 }, (err, token) => {
            // jwt.sign(userViewModel, TOKEN_SECRET, { expiresIn: '5000' }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

async function verifyToken(req) {
    const token = req.headers['authorization'];
    const refreshToken = req.headers['x-authorization'];
    // plan is to use X-Authorization header for refresh token and authorization header for access token
    // if access token is expired return with proper message to client and expect him to send
    // refresh token with x-auth header to verify and renew the access token
    // if successful send back the new access token.
    if (token) {
        return jwt.verify(token, TOKEN_SECRET, (err, verifiedData) => {
            if (err && (err.message === 'jwt expired')) {
                return 'Access token expired!';
            }
            if (err || tokenBlackList.includes(token)) {
                return 'Invalid token!';
            }
            req.user = verifiedData;
            return true;
        });
    } else if (refreshToken) {
        // if client sends refresh token its destination
        // should be to /auth/refresh which if token isn't expired
        // returns response with new access token, if it is expired
        // it should be taken care of with the code below! 
        return jwt.verify(refreshToken, TOKEN_SECRET, (err, verifiedData) => {

            if (err && (err.message === 'jwt expired')) {
                return 'Refresh token expired!';
            }
            if (err || tokenBlackList.includes(token)) {
                return 'Invalid token!';
            }
            req.user = verifiedData;
            return true;
        });
    } else {
        return true;
    }

    // if (token) {
    //     return jwt.verify(token, TOKEN_SECRET, (err, verifiedData) => {
    //         if (err || tokenBlackList.includes(token)) {
    //             console.log(err.message);
    //             return false;
    //         }
    //         req.user = verifiedData;
    //         return true;
    //     });
    // } else if (refreshToken) {
    //     return jwt.verify(token, TOKEN_SECRET, (err, verifiedData) => {
    //         if (err || tokenBlackList.includes(token)) {
    //             console.log(err.message);
    //             return false;
    //         }
    //         req.user = verifiedData;
    //         return true;
    //     });
    // } else {
    //     return true;
    // }
}