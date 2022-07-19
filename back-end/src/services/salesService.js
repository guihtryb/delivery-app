const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (id, newSale) => saleModel.create(id, newSale);

const deleteSale = async (id) => saleModel.delete(id);

const getAllSales = async () => saleModel.findAll({
  include: [
    { attributes: ['userId'], model: userModel },
    { attributes: ['sellerId'], model: userModel },
  ],
});

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, newSaleInfo) => saleModel.create(id, newSaleInfo);

module.exporgit = {
  createSale,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
