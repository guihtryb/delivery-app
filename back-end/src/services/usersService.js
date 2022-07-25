const userVerify = require('./validates/userVerify');
const { user } = require('../database/models');
const conflict = require('../errors/conflicts');
const notFound = require('../errors/notFound');
const passwordEncryptor = require('../helpers/passwordEncryptor');
const { unauthorized } = require('../errors/conflicts');

const create = async ({ name, email, password }) => {
  const encryptedPassword = passwordEncryptor(password);

  const isUserRegistered = await userVerify(email, encryptedPassword);

  if (isUserRegistered) throw conflict('User already registered');

  const createdUser = await user.create({
    name, email, password: encryptedPassword, role: 'customer' });  
  const newUser = {
    id: createdUser.id, name: createdUser.name, emal: createdUser.email, role: 'customer' };
  return newUser;
};

const getAllSellers = async () => user.findAll({ where: { role: 'seller' } });

const getAllUsers = async () => {
  const users = await user.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const getUser = await user.findByPk(id, { attributes: { exclude: 'password' } });
  if (!getUser) throw notFound('User does not exist');
  return getUser; 
};

// wip - sugestão de receber password e newPassword
const update = async (body, id) => {
  const { name, email, password } = body;
  const checkPassword = await user.findByPk(id);
  const encryptedPassword = passwordEncryptor(password);
  if (checkPassword.dataValues.password !== encryptedPassword) {
    throw unauthorized('Unauthorized user');
  }

  await user.update({ name, email }, { where: { id } });
  const userUpdated = await user.findByPk(id, { attributes: { exclude: 'password' } });
    return userUpdated;
};

const destroy = async (id, password) => {
  const checkPassword = await user.findByPk(id);
  const encryptedPassword = passwordEncryptor(password);
  if (checkPassword.dataValues.password !== encryptedPassword) {
    throw unauthorized('Unauthorized user');
  }
  await user.destroy({ where: { id } });
};

module.exports = {
  create,
  getAllSellers,
  getAllUsers,
  getUserById,
  update,
  destroy,
};