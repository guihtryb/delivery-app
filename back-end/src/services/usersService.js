const { user } = require('../models');
const userVerify = require('../validates/userValidate');
const conflict = require('../error/conflict');
const userExist = require('../validates/userExist');
const notFound = require('../error/notFound');

const create = async ({ name, email, password, role }) => {
  const isUserRegistered = await userVerify(email, password);

  if (isUserRegistered) throw conflict('User already registered');
  
  const user = await user.create({ name, email, password, role });
         
  return user;
};

const getAllUsers = async () => {
  const users = await user.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const exist = await userExist(id);
  if (exist === false) throw notFound('User does not exist');
  const user = await user.findByPk(id, { attributes: { exclude: 'password' } });
  return user; 
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