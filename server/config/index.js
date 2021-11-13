module.exports = {
    PORT: process.env.PORT || 5000,
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'mongodb://localhost:27017/e-commerce',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'i need better token secret',
};