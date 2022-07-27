const { salesProduct: salesProductModel } = require('../database/models');

const createSaleProducts = async (saleId, cartProducts) => (
  Promise.all(
    cartProducts.map(async (product) => {
      const { id: productId, quantityProduct: quantity } = product;
      await salesProductModel.create({ saleId, productId, quantity });
    }),
  )
);

const deleteSaleProduct = async (id) => salesProductModel.delete(id);

const getAllSalesProducts = async () => salesProductModel.findAll();

const getAllSalesProductsById = async (saleId) => salesProductModel.findAll({ where: { saleId } });

const updateSaleProduct = async (id, newSaleProductInfo) => (
  salesProductModel.update(id, newSaleProductInfo)
);

module.exports = {
  createSaleProducts,
  deleteSaleProduct,
  getAllSalesProducts,
  getAllSalesProductsById,
  updateSaleProduct,
};
