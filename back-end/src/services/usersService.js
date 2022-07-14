const { user } = require('../database/models/user');
const userVerify = require('./validates/userVerify');
const conflict = require('../errors/conflicts');
const userExist = require('./validates/userExist');
const notFound = require('../errors/notFound');

const create = async ({ name, email, password, role }) => {
  const isUserRegistered = await userVerify(email, password);

  if (isUserRegistered) throw conflict('User already registered');
  
  const newUser = await user.create({ name, email, password, role });
         
  return newUser;
};

const getAllUsers = async () => {
  const users = await user.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const exist = await userExist(id);
  if (exist === false) throw notFound('User does not exist');
  const getUser = await user.findByPk(id, { attributes: { exclude: 'password' } });
  return getUser; 
};

const destroy = async (id) => {
  await user.destroy({ where: { id } });
};

module.exports = {
  create,
  getAllUsers,
  getUserById,
  destroy,
};