const User = require('../models/User');

async function createUser(email, password, imageUrl) {
    const user = new User({ email, password, iat: Date.now() });

    if(imageUrl) {
        user.imageUrl = imageUrl;
    }
    
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