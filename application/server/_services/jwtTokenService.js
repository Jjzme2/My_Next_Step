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
    return this.revoke(id);
  },
  async readById(id) {
    return baseCollection.readById(tableName, id);
  },
  async revoke(id) {
    const data = { revoked: true };
    return baseCollection.update(tableName, id, data);
  },
  async isTokenRevoked(token) {
    const tokenRecord = await this.readById(token);
    return tokenRecord && tokenRecord.revoked;
  }
};

module.exports = JwtTokenService;
