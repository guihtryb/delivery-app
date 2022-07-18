const { user } = require('../../database/models');

const userVerify = async (email, password) => {
  const checkUser = await user.findOne({ where: { email, password } });
  if (checkUser) return true;
  return false;
};

module.exports = userVerify;