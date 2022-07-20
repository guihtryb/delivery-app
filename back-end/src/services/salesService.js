const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (userId, saleInfos) => {
  const { totalPrice, sellerName, deliveryAddress, deliveryNumber, status } = saleInfos;
  const { id: sellerId } = await userModel.findOne({ where: { name: sellerName } });
  const saleDate = new Date();

  const params = {
    totalPrice, userId, sellerId, deliveryAddress, deliveryNumber, saleDate, status,
  };

  const { id } = await saleModel.create(params);

  const newSale = {
    id,
    totalPrice,
    userId,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    saleDate: JSON.stringify(saleDate).split('T')[0].slice(1),
    status,
  };

  return newSale;
};

const deleteSale = async (id) => saleModel.delete(id);

const getAllSales = async () => saleModel.findAll({
  include: { as: 'users', model: userModel, attributes: ['id'] },
});

const getAllSalesByUser = async (id) => (
  saleModel.findAll({ where: { sellerId: id } || { userId: id } })
);

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, status) => (saleModel.update({ where: { id } }, { status }));

module.exports = {
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesByUser,
  getSaleById,
  updateSale,
};
