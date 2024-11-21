const baseCollection = require("../_services/baseCollection");
const Model = require("../_models/User");

const tableName = "users";

const UserCollection = {
  async getAll() {
    return baseCollection.getAll(tableName);
  },
  async create(data) {
    return baseCollection.create(tableName, Model, data);
  },
  async update(id, data) {
    return baseCollection.update(tableName, id, data);
  },
  async delete(id) {
    return baseCollection.delete(tableName, id);
  },
  async readById(id) {
    return baseCollection.readById(tableName, id);
  },
  async getActive() {
    return baseCollection.getActive(tableName);
  },
  async getInactive() {
    return baseCollection.getInactive(tableName);
  },
};

module.exports = UserCollection;
