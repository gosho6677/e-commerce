module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/e-commerce',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'i need better token secret',
};