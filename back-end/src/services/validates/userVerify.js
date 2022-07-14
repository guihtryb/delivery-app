const { User } = require('../models');

const userVerify = async (email, password) => {
  const userVerify = await User.findOne({ where: { email, password } });
  if (userVerify) return userVerify;
  return false;
};

module.exports = userVerify;