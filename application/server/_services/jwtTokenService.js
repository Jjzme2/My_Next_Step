const baseCollection = require("../_services/baseCollection");
const JwtToken = require("../_models/JwtToken");

const tableName = "jwt_tokens";

const JwtTokenService = {
  async getAll() {
    return baseCollection.getAll(tableName);
  },
  async create(data) {
    return baseCollection.create(tableName, JwtToken, data);
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
};

module.exports = JwtTokenService;
