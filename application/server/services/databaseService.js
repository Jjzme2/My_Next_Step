const pool = require("../config/db");
const logger = require("../utils/logger");

const database = {
  async connect() {
    try {
      await pool.connect();
      logger.info("Connected to the database");
    } catch (error) {
      logger.error("Failed to connect to the database", error);
    }
  },

  async disconnect() {
    try {
      await pool.end();
      logger.info("Disconnected from the database");
    } catch (error) {
      logger.error("Failed to disconnect from the database", error);
    }
  },

  async query(text, params, doLog = false) {
    try {
      const start = Date.now();
      const { rows } = await pool.query(text, params);
      const duration = Date.now() - start;
      if (doLog) {
        logger.info("Executed query", { text, duration, rows });
      }
      return rows;
    } catch (error) {
      logger.error("Error executing query", error);
      throw error;
    }
  },

  async list(table) {
    try {
      const query = `SELECT * FROM ${table}`;
      const rows = await this.query(query);
      logger.info(`Listed all records from ${table}`);
      return rows;
    } catch (error) {
      logger.error(`Error listing from ${table}`, error);
      throw error;
    }
  },

  async create(table, data) {
    try {
      const keys = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
      const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;
      const rows = await this.query(query, values);
      logger.info(`Created new record in ${table}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error creating in ${table}`, error);
      throw error;
    }
  },

  async update(table, id, data) {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const query = `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
      const rows = await this.query(query, [...values, id]);
      logger.info(`Updated record in ${table} with id ${id}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error updating in ${table}`, error);
      throw error;
    }
  },

  async delete(table, id) {
    try {
      const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
      const rows = await this.query(query, [id]);
      logger.info(`Deleted record from ${table} with id ${id}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error deleting from ${table}`, error);
      throw error;
    }
  },
};

module.exports = database;
