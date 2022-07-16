const { getProductById } = require('./productsService');
const { getAllById } = require('./salesProductsService');
const { sale: saleModel, user: userModel } = require('../database/models');

const createSale = async (id, newSale) => saleModel.create(id, newSale);

const deleteSale = async (id) => saleModel.delete(id);

const formingProducts = async (saleId) => {
  const salesProducts = await getAllById(saleId);

  return salesProducts.map(async (saleProduct) => {
    const { productId, quantity } = saleProduct;
    const product = await getProductById(productId);
    const { id, name, price, urlImage } = product;

    return { id, name, price, urlImage, quantity };
  });
};

const calcTotalPrice = async (products) => {
  let totalPrice = 0;

  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  return totalPrice;
};

const getAllSales = async () => {
  const sales = await saleModel.findAll({
    include: [
      { attributes: ['userId'], model: userModel },
      { attributes: ['sellerId'], model: userModel },
    ],
  });

  return sales.map(async (sale) => {
    const { id, userId, sellerId, deliveryAddress, deliveryNumber, saleDate, status } = sale;
    const products = await formingProducts(id);
    const totalPrice = await calcTotalPrice(products);

    return {
      id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status, products,
    };
  });
};

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, newSaleInfo) => saleModel.create(id, newSaleInfo);

export { createSale, deleteSale, getAllSales, getSaleById, updateSale };
