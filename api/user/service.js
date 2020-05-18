const { get, set } = require('lodash');

const User = require('./model');
const Office = require('../office/model');
const Departure = require('../departure/model');
const Project = require('../project/model');

module.exports.getInfo = async (userId, companyId) => {
  try {
    const user = await User.findOneById(userId);

    if (String(companyId) !== String(user.companyId)) {
      const error = new Error('Invalid companyId');
      error.statusCode = 401;
      throw error;
    }

    const officeWorkplaceId = get(user, "officeWorkplaceId");
    const departureId = get(user, "departureId");

    let office, departure;
    if (officeWorkplaceId && departureId) {
      office = await Office.findById(officeWorkplaceId);
      departure = await Departure.findById(departureId);

      set(user, 'officeName', get(office, 'name'));
      set(user, 'departureName', get(departure, 'name'));
    }
    const projects = await Project.findByMemberId(userId);

    set(user, 'projectJoin', projects);
    return { user, office };
  } catch (error) {
    throw error;
  }
};