const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (userId, saleInfos) => {
  const { totalPrice, deliveryAddress, deliveryNumber, status } = saleInfos;
  const saleDate = new Date();

  const params = { totalPrice, userId, deliveryAddress, deliveryNumber, saleDate, status };
  const { id } = await saleModel.create(params, { where: { userId } });
  const newSale = {
    id,
    totalPrice,
    userId,
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

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, newSaleInfo) => saleModel.create(id, newSaleInfo);

module.exports = {
  createSale,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
