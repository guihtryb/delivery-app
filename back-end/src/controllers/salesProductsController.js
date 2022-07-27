const salesProductsService = require('../services/salesProductsService');

const createSaleProducts = async (req, res, next) => {
  try {
    const { cartProducts, saleId } = req.body;
    const newSalesProducts = await salesProductsService.createSaleProducts(saleId, cartProducts);
    return res.status(201).json(newSalesProducts);
  } catch (error) {
    next(error);
  }
};

const deleteSaleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesProductsService.deleteSaleProduct(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getAllSalesProducts = async (_req, res, next) => {
  try {
    const salesProducts = await salesProductsService.getAllSalesProducts();
    return res.status(200).json(salesProducts);
  } catch (error) {
    next(error);
  }
};

const getSaleProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleProduct = await salesProductsService.getSaleProductById(id);
    return res.status(200).json(saleProduct);
  } catch (error) {
    next(error);
  }
};

const updateSaleProduct = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;
    const updatedSaleProduct = await salesProductsService.updateSaleProduct(id, body);
    return res.status(200).json(updatedSaleProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSaleProducts,
  deleteSaleProduct,
  getAllSalesProducts,
  getSaleProductById,
  updateSaleProduct,
};
