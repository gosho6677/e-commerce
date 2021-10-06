const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authServices = require('../services/authServices');

const { TOKEN_SECRET } = require('../config');

const tokenBlackList = [];

module.exports = () => (req, res, next) => {
    req.auth = {
        register: async ({ email, username, password }) => {
            const token = await registerToken(email, username, password);
            res.status(201).json({ ok: true, token });
        },
        login: async ({ email, password }) => {
            const token = await loginToken(email, password);
            res.json({ ok: true, token });
        },
        logout: async () => {
            tokenBlackList.push(req.headers['authorization']);
            console.log(`Token ${req.headers['authorization'].slice(0,25)}... blacklisted. ${tokenBlackList.length} total.`);
            res.json({ ok: true });
        }
    };

    if (verifyToken(req)) {
        next();
    } else {
        res.status(401).json({ ok: false, error: 'Invalid token!' });
    }
};

async function registerToken(email, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authServices.createUser(email, username, hashedPassword);
    return createToken(user);
}

async function loginToken(email, password) {
    const user = await authServices.getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password.');
    }

    return createToken(user);
}

async function createToken(user) {
    const userViewModel = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(userViewModel, TOKEN_SECRET, { expiresIn: '12h' });
    return token;
}

function verifyToken(req) {
    const token = req.headers['authorization'];

    if (token) {
        try {
            const verifiedData = jwt.verify(token, TOKEN_SECRET);
            if (!verifiedData || tokenBlackList.includes(token)) {
                throw new Error();
            }
            req.user = verifiedData;
        } catch (err) {
            return false;
        }
    }
    return true;
}