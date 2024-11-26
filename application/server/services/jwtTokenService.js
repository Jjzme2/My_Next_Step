const baseCollection = require("../services/baseCollection");
const JwtToken = require("../models/JwtToken");
const logger = require("../utils/logger");
const authMiddleware = require("../middleware/authMiddleware");

const tableName = "jwt_tokens";

const JwtTokenService = {
  async getAll() {
    try {
      const tokens = await baseCollection.getAll(tableName);
      logger.info("Fetched all tokens successfully");
      return tokens;
    } catch (error) {
      logger.error(`Error fetching tokens: ${error.message}`);
      throw error;
    }
  },
  async readByToken(token) {
    try {
      const query = `SELECT * FROM ${tableName} WHERE token = $1`;
      const result = await baseCollection.query(query, [token]);
      logger.info(`Fetched token by token value successfully`);
      return result[0];
    } catch (error) {
      logger.error(`Error fetching token by token value: ${error.message}`);
      throw error;
    }
  },
  async create(data) {
    try {
      const newToken = await baseCollection.create(tableName, JwtToken, data);
      logger.info("Created new token successfully");
      return newToken;
    } catch (error) {
      logger.error(`Error creating token: ${error.message}`);
      throw error;
    }
  },
  async update(id, data) {
    try {
      const updatedToken = await baseCollection.update(tableName, id, data);
      logger.info(`Updated token with ID ${id} successfully`);
      return updatedToken;
    } catch (error) {
      logger.error(`Error updating token with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async delete(id) {
    try {
      await this.revoke(id);
      logger.info(`Deleted token with ID ${id} successfully`);
    } catch (error) {
      logger.error(`Error deleting token with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async readById(id) {
    try {
      const token = await baseCollection.readById(tableName, id);
      logger.info(`Fetched token with ID ${id} successfully`);
      return token;
    } catch (error) {
      logger.error(`Error fetching token with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async revoke(id) {
    try {
      const data = { revoked: true };
      const revokedToken = await baseCollection.update(tableName, id, data);
      logger.info(`Revoked token with ID ${id} successfully`);
      return revokedToken;
    } catch (error) {
      logger.error(`Error revoking token with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async isTokenRevoked(token) {
    try {
      const tokenRecord = await this.readByToken(token);
      const isRevoked = tokenRecord && tokenRecord.revoked;
      logger.info(`Checked if token is revoked: ${isRevoked}`);
      return isRevoked;
    } catch (error) {
      logger.error(`Error checking if token is revoked: ${error.message}`);
      throw error;
    }
  },
};

module.exports = JwtTokenService;
