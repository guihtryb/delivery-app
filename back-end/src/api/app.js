const cors = require('cors');
const express = require('express');
const path = require('path');
const { json } = require('body-parser');
const errors = require('../middlewares/errors');
const salesRoutes = require('../routes/salesRoutes');
const loginRoutes = require('../routes/loginRoutes');
const usersRoutes = require('../routes/usersRoutes');
const productsRouter = require('../routes/productsRouter');
const registerRoutes = require('../routes/registerRoutes');

const app = express();

app.use(json());
app.use(cors());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(usersRoutes);
app.use(productsRouter);
app.use(registerRoutes);
app.use(salesRoutes);

app.use('/images', express.static(path.join(__dirname, '../../public/images')));
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errors);

module.exports = app;
