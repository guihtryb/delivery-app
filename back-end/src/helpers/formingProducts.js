const salesProductsService = require('../services/salesProductsService');

const formingProducts = async (saleId, cartProducts) => (
  Promise.all(cartProducts.map(async (product) => {
    const { id: productId, quantityProduct: quantity } = product;
    await salesProductsService.createSaleProducts({ saleId, productId, quantity });
  }))
);

module.exports = formingProducts;
