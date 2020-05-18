const { ObjectId } = require('mongodb');

const { getDB } = require('../../config/database');

module.exports = class Departure {
  constructor(officeId, name, members, leader, isAnotherDeparture, id) {
    this._id = id ? new ObjectId(id) : null;
    this.officeId = new ObjectId(officeId);
    this.name = name;
    this.members = members || [];
    this.isAnotherDeparture = isAnotherDeparture ? new ObjectId(isAnotherDeparture) : null;
  }

  static async findOneById(departureId) {
    try {
      const db = getDB();

      const departure = await db.collection('departures').findOne({ _id: new ObjectId(departureId) });
      return departure;
    } catch (error) {
      throw error;
    }
  }
};