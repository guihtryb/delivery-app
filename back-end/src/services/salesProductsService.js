const { salesProduct: salesProductModel } = require('../database/models');

const createSaleProducts = async (saleProductInfos) => salesProductModel.create(saleProductInfos);

const deleteSaleProduct = async (id) => salesProductModel.delete(id);

const getAllSalesProducts = async () => salesProductModel.findAll();

const getSaleProductById = async (id) => salesProductModel.findOne(id);

const updateSaleProduct = async (id, newSaleProductInfo) => (
  salesProductModel.update(id, newSaleProductInfo)
);

module.exports = {
  createSaleProducts,
  deleteSaleProduct,
  getAllSalesProducts,
  getSaleProductById,
  updateSaleProduct,
};
