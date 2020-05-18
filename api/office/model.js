const { ObjectId } = require('mongodb');

const { getDB } = require('../../config/database');

module.exports = class Office {
  constructor(id, companyId, name, address, city, timeStarted, timeEnded, departures, shifts, location, zoneName) {
    this.companyId = new ObjectId(companyId);
    this.name = name;
    this.address = address;
    this.city = city;
    this.timeStarted = timeStarted;
    this.timeEnded = timeEnded;
    this.shifts = shifts || [];
    this._id = id ? new ObjectId(id) : null;
    this.location = location;
    this.zoneName = zoneName;
  }

  static async findOneById(id) {
    try {
      const db = getDB();

      const office = await db.collection('office_workplaces').findOne({ _id: new ObjectId(id) });
      return office;
    } catch (error) {
      throw error;
    }
  }
};