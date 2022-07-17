const Joi = require('joi');
const badRequest = require('../errors/badRequest');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginMiddleware = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ email, password });
    if (error) throw badRequest(error.message);

  next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginMiddleware; 