const { saleProduct: saleProductModel } = require('../database/models');

const createSaleProduct = async (saleProductInfos) => (
  saleProductModel.create(saleProductInfos)
);

const deleteSaleProduct = async (id) => saleProductModel.delete(id);

const getAllSalesProducts = async () => saleProductModel.findAll();

const getSaleProductById = async (id) => saleProductModel.findOne(id);

const updateSaleProduct = async (id, newSaleProductInfo) => (
  saleProductModel.update(id, newSaleProductInfo)
);

module.exports = {
  createSaleProduct,
  deleteSaleProduct,
  getAllSalesProducts,
  getSaleProductById,
  updateSaleProduct,
};
