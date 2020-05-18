const jwt = require('jsonwebtoken');

const service = require('./service');

module.exports.signup = async (req, res, next) => {
  try {
    const result = await service.signup(req.body);
    res.status(201).json({ message: 'User Created' });
  } catch (error) {
    next(error);
  }
};

module.exports.login = (req, res, next) => {
  const user = req.user;

  const token = 'Bearer ' + jwt.sign({ email: user.email, userId: user._id, companyId: user.companyId, companyName: user.name, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.status(200).json({ message: 'login success', token, userId: user._id });
};