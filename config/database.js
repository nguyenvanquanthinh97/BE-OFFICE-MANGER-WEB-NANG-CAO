const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/";

let _db;

const initialConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(url);
    _db = client.db('office-manager');
    return callback();
  } catch (error) {
    if (error) {
      throw error;
    }
  }

};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw new Error("Error in connecting to Mongodb");
};

module.exports = {
  initialConnect,
  getDB
};