const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const usersRoutes = require('../routes/usersRoutes');
const errors = require('../middlewares/errors');

const app = express();
app.use(json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(usersRoutes);

app.use(errors);

module.exports = app;
