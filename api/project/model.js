const { ObjectId } = require('mongodb');

const { getDB } = require('../../config/database');

module.exports = class Project {
  constructor(id, companyId, name, prefixedCode, description, statuses, taskList, members, projectManagerId, projectManagerUsername) {
    this._id = id ? new ObjectId(id) : null;
    this.companyId = new ObjectId(companyId);
    this.name = name;
    this.prefixedCode = prefixedCode;
    this.description = description;
    this.statuses = statuses || [];
    this.taskList = taskList || [];
    this.members = members || [];
    this.projectManagerId = new ObjectId(projectManagerId);
    this.projectManagerUsername = projectManagerUsername;
  }

  static async findByMemberId(memberId) {
    try {
      const db = getDB();

      const projects = await db.collection('projects')
        .find({ "members.memberId": new ObjectId(memberId) }, { name: 1, description: 1 })
        .toArray();
      return projects;
    } catch (error) {
      throw error;
    }
  }
};