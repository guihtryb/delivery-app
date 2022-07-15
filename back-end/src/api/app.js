const { json } = require('body-parser');
const express = require('express');
const productsRouter = require('../routes/productsRouter');

const app = express();

app.use(json());

app.use(productsRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
