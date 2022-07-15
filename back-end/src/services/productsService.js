const Product = require('../database/models/product');

const getAll = () => Product.findAll();

const getById = (id) => {
  const product = Product.findByPk(id);

  return !product ? null : product;
};

export { getAll, getById };