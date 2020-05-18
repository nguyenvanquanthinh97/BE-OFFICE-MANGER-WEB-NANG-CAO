const { ObjectId } = require('mongodb');

const { getDB } = require('../../config/database');

module.exports = class Company {
  constructor(id, name, userRegisteredId, officeWorkplaces) {
    this._id = id ? new ObjectId(id) : null;
    this.name = name;
    this.userRegisteredId = userRegisteredId;
    this.officeWorkplaces = officeWorkplaces || [];
    this.verify = false;
  }

  async save() {
    try {
      const db = getDB();
      const result = await db.collection('companies').insertOne(this);
      return result;
    } catch (error) {
      throw error;
    }
  };

  static async updatedById(companyId, args) {
    try {
      const db = getDB();

      const result = await db.collection('companies').updateOne({ _id: new ObjectId(companyId) }, { $set: args });
      return result;
    } catch (error) {
      throw error;
    }
  }
};