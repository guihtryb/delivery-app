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

  const createUser = await user.create({ name, email, encryptedPassword });  
         
  return createUser;
};

const getAllUsers = async () => {
  const users = await user.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const getUser = await user.findByPk(id, { attributes: { exclude: 'password' } });
  if (!getUser) throw notFound('User does not exist');
  return getUser; 
};

const update = async (body, id) => {
  const { name, email, password, role } = body;
  const checkPassword = await user.findByPk(id);
  const encryptedPassword = passwordEncryptor(password);
  if (checkPassword.id !== encryptedPassword || role !== 'admin') {
    throw unauthorized('Unauthorized user');
  }
  if (role === 'admin') {
    const userUpdated = await user.update({ name, email, role }, { where: { id } });
    return userUpdated;
  }
  const userUpdated = await user.update({ name, email }, { where: { id } });
    return userUpdated;
};

const destroy = async (id) => {
  await user.destroy({ where: { id } });
};

module.exports = {
  create,
  getAllUsers,
  getUserById,
  update,
  destroy,
};