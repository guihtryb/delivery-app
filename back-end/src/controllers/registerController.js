const userService = require('../services/usersService');

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await userService.create({ name, email, password });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { create }; 