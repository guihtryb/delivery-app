const { Router } = require('express');
const tokenVerify = require('../middlewares/tokenVerify');
const salesController = require('../controllers/salesController');
const { createSaleProducts } = require('../controllers/salesProductsController');

const router = Router();
const { 
  createSale,
  deleteSale,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
} = salesController;

const saleId = '/sales/:id';

router.post('/sales', tokenVerify, createSale);
router.post('/salesProducts', createSaleProducts);
router.delete(saleId, deleteSale);
router.get('/sales/seller', tokenVerify, getAllSalesBySeller);
router.get('/sales/user', tokenVerify, getAllSalesByUser);
router.get(saleId, getSaleById);
router.put(saleId, updateSale);

module.exports = router;
