const express = require('express');

const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/products', productsController.getAll);

productsRouter.get('/products/:id', productsController.getById);

module.exports = productsRouter;