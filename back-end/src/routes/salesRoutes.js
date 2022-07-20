const { Router } = require('express');
const tokenVerify = require('../middlewares/tokenVerify');
const salesController = require('../controllers/salesController');

const router = Router();
const { 
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesByUser,
  getSaleById,
  updateSale,
} = salesController;

router.post('/sales', tokenVerify, createSale);
router.delete('/sales', deleteSale);
router.get('/sales', getAllSales);
router.get('/sales/seller', tokenVerify, getAllSalesByUser);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSale);

module.exports = router;
