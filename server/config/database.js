const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./index');

module.exports = () => mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});