const productsService = require('./productsService');
const formingSale = require('../helpers/formingSale');
const formingSaleDate = require('../helpers/formingSaleDate');
const salesProductsService = require('./salesProductsService');
const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (newSaleInfos) => {
  // const {
  //   totalPrice, sellerName, deliveryAddress, deliveryNumber, status,
  // } = newSaleInfos;

  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
  } = newSaleInfos;

  // const { id: sellerId } = await userModel.findOne({ where: { name: sellerName } });

  const saleDate = new Date();

  const saleParams = {
    totalPrice,
    userId,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status: 'Pendente',
  };

  const { id } = await saleModel.create(saleParams);

  return formingSale(id, saleParams);
};

const deleteSale = async (id) => saleModel.delete(id);

const getAllSalesBySeller = async (sellerId) => {
  const sellerSales = await saleModel.findAll({ where: { sellerId } });

  return sellerSales.map((sale) => {
    const { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = sale;
    return {
      id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: formingSaleDate(saleDate),
      status,
    };
  });
};

const getAllSalesByUser = async (userId) => {
  const userSales = await saleModel.findAll({ where: { userId } });

  return userSales.map((sale) => {
    const { id, totalPrice, saleDate, status } = sale;
    return {
      id,
      totalPrice,
      saleDate: formingSaleDate(saleDate),
      status,
    };
  });
};

const getSaleById = async (id) => {
  const salesProducts = await salesProductsService.getAllSalesProductsById(id);
  const { totalPrice, sellerId, saleDate, status } = await saleModel.findByPk(id);
  const { name: sellerName } = await userModel.findByPk(sellerId);

  const products = await Promise.all(
    salesProducts.map(async (saleProducts) => {
      const { productId, quantity } = saleProducts;
      const { name, price, urlImage } = await productsService.getById(productId);
      return { id: productId, name, price, urlImage, quantity };
    }),
  );

  return {
    id,
    totalPrice,
    sellerName,
    saleDate: formingSaleDate(saleDate),
    status,
    products,
  };
};

const updateSale = async (id, status) => {
  await saleModel.update({ status }, { where: { id } });
  const updatedSale = await getSaleById(id);
  return updatedSale;
};

module.exports = {
  createSale,
  deleteSale,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
};
