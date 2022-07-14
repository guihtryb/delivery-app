const { user: User } = require('../database/models/user');
const userVerify = require('./validates/userVerify');
const conflict = require('../errors/conflicts');
// const userExist = require('./validates/userExist');
const notFound = require('../errors/notFound');

const create = async ({ name, email, password, role }) => {
  const isUserRegistered = await userVerify(email, password);

  if (isUserRegistered) throw conflict('User already registered');
  
  const user = await User.create({ name, email, password, role });
         
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  // const exist = await userExist(id);
  
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  if (!user) throw notFound('User does not exist');
  return user; 
};

const destroy = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAllUsers,
  getUserById,
  destroy,
};