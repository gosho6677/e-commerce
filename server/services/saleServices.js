const Sale = require('../models/Sale');

const getAllUserSales = async (userId) => {
    return await Sale.find({ userId });
};

module.exports = {
    getAllUserSales,
};