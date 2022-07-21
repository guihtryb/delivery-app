const createSaleDate = require('../helpers/createSaleDate');
const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (userId, saleInfos) => {
  const { totalPrice, sellerName, deliveryAddress, deliveryNumber, status } = saleInfos;
  const { id: sellerId } = await userModel.findOne({ where: { name: sellerName } });
  const saleDate = createSaleDate();

  const params = {
    totalPrice, userId, sellerId, deliveryAddress, deliveryNumber, saleDate, status,
  };

  const newSale = await saleModel.create(params);
  return newSale;
};

const deleteSale = async (id) => saleModel.delete(id);

const getAllSales = async () => saleModel.findAll({
  include: { as: 'users', model: userModel, attributes: ['id'] },
});

const getAllSalesBySeller = async (id) => saleModel.findAll({ where: { sellerId: id } });

const getAllSalesByUser = async (id) => saleModel.findAll({ where: { userId: id } });

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, status) => saleModel.update({ status }, { where: { id } });

module.exports = {
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
};
