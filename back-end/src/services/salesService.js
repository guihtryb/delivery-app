const { sale: saleModel } = require('../database/models');

const createSale = async (id, newSale) => saleModel.create(id, newSale);

const deleteSale = async (id) => saleModel.delete(id);

const getAllSales = async () => saleModel.findAll();

const getSaleById = async (id) => saleModel.findOne(id);

const updateSale = async (id, newSaleInfo) => saleModel.create(id, newSaleInfo);

export { createSale, deleteSale, getAllSales, getSaleById, updateSale };
