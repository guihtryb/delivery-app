const userVerify = require('./validates/userVerify');
const { user } = require('../database/models');
const conflict = require('../errors/conflicts');
const passwordEncryptor = require('../helpers/passwordEncryptor');

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

module.exports = { create };