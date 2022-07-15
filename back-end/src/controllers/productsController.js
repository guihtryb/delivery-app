const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.getById(id);

    if (!product) return res.status(404).json({ message: 'Product Not Found' });

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Service Error' });
  }
};

module.exports = { getAll, getById };