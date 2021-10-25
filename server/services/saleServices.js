const Sale = require('../models/Sale');

const getAllUserSales = async (userId) => {
    return await Sale.find({ productOwner: userId }).populate('product');
};

const changeSaleStatus = async (saleId) => {
    return await Sale.findByIdAndUpdate(saleId, { status: 'completed' });
};

module.exports = {
    getAllUserSales,
    changeSaleStatus,
};