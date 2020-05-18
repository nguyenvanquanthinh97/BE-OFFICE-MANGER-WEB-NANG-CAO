const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

const { ROLE } = require('../../constant');
const User = require('../user/model');
const Company = require('../company/model');

module.exports.signup = async ({ companyName, username, email, password }) => {
  const role = ROLE.administrator;

  const schema = Joi.object().keys({
    companyName: Joi.string().trim().min(2).required(),
    username: Joi.string().trim().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6)
  });

  const { error, value } = schema.validate({ companyName, username, email, password });

  if (error) {
    const err = new Error(error);
    err.statusCode = 422;
    return next(err);
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hasedPassword = await bcrypt.hash(value.password, salt);
    const company = new Company(null, companyName);
    const companyInserted = await company.save();
    const companyId = companyInserted.insertedId;
    const user = new User(null, value.username, value.email, companyId, role, hasedPassword);
    const userInserted = await user.save();
    await Company.updatedById(companyId, { userRegisteredId: userInserted.insertedId });
    return userInserted;
  } catch (error) {
    throw error;
  }
};