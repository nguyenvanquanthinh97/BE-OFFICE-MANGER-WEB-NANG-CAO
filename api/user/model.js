const { ObjectId } = require('mongodb');

const { getDB } = require('../../config/database');

module.exports = class User {
  constructor(id, username, email, companyId, role, password, officeWorkplaceId, departureId) {
    this._id = id ? new ObjectId(id) : null;
    this.username = username;
    this.email = email;
    this.companyId = companyId ? new ObjectId(companyId) : null;
    this.role = role;
    this.password = password;
    this.officeWorkplaceId = officeWorkplaceId ? new ObjectId(officeWorkplaceId) : null;
    this.departureId = departureId ? new ObjectId(departureId) : null;
    this.actived = true;
    this.inActivingUserId = null;
    this.img = null;
  }

  async save() {
    try {
      const db = getDB();
      const result = await db.collection('users').insertOne(this);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findOneById(id) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findOneByEmail(email) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
};