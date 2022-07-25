const { Router } = require('express');
const tokenVerify = require('../middlewares/tokenVerify');
const salesController = require('../controllers/salesController');

const router = Router();
const { 
  createSale,
  deleteSale,
  getAllSales,
  getAllSalesBySeller,
  getAllSalesByUser,
  getSaleById,
  updateSale,
} = salesController;

router.post('/sales', tokenVerify, createSale);
router.delete('/sales', deleteSale); // id
router.get('/sales', getAllSales);
router.get('/sales/seller', tokenVerify, getAllSalesBySeller);
router.get('/sales/user', tokenVerify, getAllSalesByUser);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSale);

module.exports = router;
