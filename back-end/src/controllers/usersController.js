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

const getAllSellers = async (_req, res, next) => {
  try {
    const sellers = await userService.getAllSellers();
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await userService.update(body, id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await userService.destroy(id, password);
    return res.status(204).json({ message: 'Account closed successfully, come back anytime' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAllSellers,
  getAllUsers,
  getUserById,
  update,
  destroy,
}; 