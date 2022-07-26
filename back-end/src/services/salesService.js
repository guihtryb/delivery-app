const formingSale = require('../helpers/formingSale');
const formingProducts = require('../helpers/formingProducts');
const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (saleInfos, userId) => {
  const {
    totalPrice, sellerName, deliveryAddress, deliveryNumber, status, cartProducts,
  } = saleInfos;

  const { id: sellerId } = await userModel.findOne({ where: { name: sellerName } });
  const saleDate = new Date();
  const saleParams = {
    totalPrice,
    userId,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  };

  const { id } = await saleModel.create(saleParams, { where: { userId } });
  const newSale = formingSale(id, saleParams, cartProducts);
  await formingProducts(id, cartProducts);

  return newSale;
};

const deleteSale = async (id) => saleModel.delete(id);

const getAllSales = async () => saleModel.findAll({
  include: { as: 'users', model: userModel, attributes: ['id'] },
});

const getAllSalesBySeller = async (sellerId) => saleModel.findAll({ where: { sellerId } });

const getAllSalesByUser = async (userId) => saleModel.findAll({
  attributes: { exclude: ['deliveryAddress', 'deliveryNumber'] }, where: { userId },
});

const getSaleById = async (id) => saleModel.findByPk(id);

const updateSale = async (id, status) => saleModel.update({ status }, { where: { id } }); // wip - retornar objeto sale com status atualizado

module.exports = {
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
};
