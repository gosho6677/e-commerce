const mongoose = require('mongoose');
const { DATABASE_URL } = require('./index');

module.exports = () => mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});