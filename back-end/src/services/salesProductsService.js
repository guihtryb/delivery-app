const { saleProduct: saleProductModel } = require('../database/models/saleProduct');

const getAllById = async (saleId) => saleProductModel.findAll({ where: { saleId } });

export default getAllById;
