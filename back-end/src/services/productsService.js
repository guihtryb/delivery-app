const { product } = require('../database/models');

const getAll = async () => product.findAll();

const getById = async (id) => {
  const productById = await product.findByPk(+id);

  return !productById ? null : productById;
};

module.exports = { getAll, getById };