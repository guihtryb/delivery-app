const Product = require('../database/models/product');

const getAll = async () => Product.findAll();

const getById = async (id) => {
  const product = await Product.findByPk(id);

  return !product ? null : product;
};

export { getAll, getById };