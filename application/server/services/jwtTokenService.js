const baseCollection = require("../services/baseCollection");
const JwtToken = require("../models/JwtToken");

const tableName = "jwt_tokens";

const JwtTokenService = {
  async getAll() {
    return baseCollection.getAll(tableName);
  },
  async readByToken(token) {
    const query = `SELECT * FROM ${tableName} WHERE token = $1`;
    const result = await baseCollection.query(query, [token]);
    return result[0];
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
    const tokenRecord = await this.readByToken(token);
    return tokenRecord && tokenRecord.revoked;
  },
};

module.exports = JwtTokenService;
