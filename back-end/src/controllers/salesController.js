const salesService = require('../services/salesService');

const createSale = async (req, res, next) => {
  try {
    const { body } = req;
    const newSale = await salesService.createSale(body);
    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getAllSalesBySeller = async (req, res, next) => {
  try {
    const { user } = req;
    const sale = await salesService.getAllSalesBySeller(user);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const getAllSalesByUser = async (req, res, next) => {
  try {
    const { user } = req;
    const sale = await salesService.getAllSalesByUser(user);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { body: { status }, params: { id } } = req;
    const updatedSale = await salesService.updateSale(id, status);
    return res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSale,
  deleteSale,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
};
