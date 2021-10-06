const User = require('../models/User');

async function createUser(email, username, password) {
    const user = new User({ email, username, password, iat: Date.now() });
    return await user.save();
}

async function getUserByUsername(username) {
    let re = new RegExp(`^${username}$`, 'i');
    return await User.findOne({ username: { $regex: re } });
}

async function getUserByEmail(email) {
    let re = new RegExp(`^${email}$`, 'i');
    return await User.findOne({ email: { $regex: re } });
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
};