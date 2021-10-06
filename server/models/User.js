const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    iat: { type: Date, required: true },
});

module.exports = model('User', schema);