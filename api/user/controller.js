const { get, set, omit } = require('lodash');

const service = require('./service');

module.exports.getInfo = async (req, res, next) => {
  const userId = get(req.params, 'userId');
  const companyId = get(req.user, 'companyId');
  try {
    const { user, office } = await service.getInfo(userId, companyId);
    res.status(200).json({ message: 'Fetch info success', user: omit(user, 'password'), office });
  } catch (error) {
    next(error);
  }
};