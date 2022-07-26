const formingSaleDate = require('./formingSaleDate');

const formingSale = (id, saleParams, products) => {
  const { totalPrice, userId, deliveryAddress, deliveryNumber, saleDate, status } = saleParams;

  return {
    id,
    totalPrice,
    userId,
    deliveryAddress,
    deliveryNumber,
    saleDate: formingSaleDate(saleDate),
    status,
    products,
  };
};

module.exports = formingSale;
