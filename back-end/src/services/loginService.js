const { user } = require('../database/models');
const createToken = require('../helpers/createToken');
const notFound = require('../errors/notFound');
const passwordEncryptor = require('../helpers/passwordEncryptor');

const login = async ({ email, password }) => {
  const encryptedPassword = passwordEncryptor(password);

  const getUser = await user.findOne({ where: { email, password: encryptedPassword } });

  if (!getUser) throw notFound('Not found');

  const userToken = createToken({ id: getUser.id });

  const userLoged = {
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
    token: userToken,
  };
  
  return userLoged;
};

module.exports = { login }; 