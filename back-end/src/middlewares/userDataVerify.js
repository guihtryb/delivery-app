const Joi = require('joi');
const badRequest = require('../errors/badRequest');

const userSchema = Joi.object({
  name: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userDataVerify = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { error } = userSchema.validate({ name, email, password });
    if (error) throw badRequest(error.message);

  next();
  } catch (error) {
    next(error);
  }
};

module.exports = userDataVerify; 