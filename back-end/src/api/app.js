const { json } = require('body-parser');
const cors = require('cors');
const express = require('express');
const productsRouter = require('../routes/productsRouter');
const usersRoutes = require('../routes/usersRoutes');
const registerRoutes = require('../routes/registerRoutes');
const loginRoutes = require('../routes/loginRoutes');
const errors = require('../middlewares/errors');

const app = express();
app.use(json());
app.use(cors());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(usersRoutes);
app.use(productsRouter);
app.use(registerRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errors);

module.exports = app;
