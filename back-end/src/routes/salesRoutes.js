const { Router } = require('express');
const salesController = require('../controllers/salesController');

const router = Router();
const { createSale, deleteSale, getAllSales, getSaleById, updateSale } = salesController;

router.post('/sales/:userId', createSale);
router.delete('/sales', deleteSale);
router.get('/sales', getAllSales);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSale);

module.exports = router;
