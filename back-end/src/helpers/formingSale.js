const formingSaleDate = require('./formingSaleDate');
const { user: userModel } = require('../database/models');

const formingSale = async (id, saleParams) => {
  const {
    totalPrice, userId, sellerId, deliveryAddress, deliveryNumber, saleDate, status,
  } = saleParams;

  const { name: sellerName } = await userModel.findByPk(sellerId);

  return {
    id,
    totalPrice,
    userId,
    sellerName,
    deliveryAddress,
    deliveryNumber,
    saleDate: formingSaleDate(saleDate),
    status,
    // products,
  };
};

module.exports = formingSale;
