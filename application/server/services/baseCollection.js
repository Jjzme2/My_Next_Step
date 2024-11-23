const databaseService = require("./databaseService");

const baseCollection = {
  async getAll(tableName) {
    try {
      const collection = await databaseService.list(tableName);
      return collection;
    } catch (error) {
      throw new Error(`Error fetching ${tableName}: ${error.message}`);
    }
  },

  async create(tableName, Model, data) {
    try {
      const newModel = new Model(data);
      const savedModel = await newModel.save();
      return savedModel;
    } catch (error) {
      throw new Error(`Error creating ${tableName}: ${error.message}`);
    }
  },

  async update(tableName, id, data) {
    try {
      const updatedModel = await databaseService.update(tableName, id, data);
      return updatedModel;
    } catch (error) {
      throw new Error(`Error updating ${tableName}: ${error.message}`);
    }
  },

  async delete(tableName, id) {
    try {
      const deletedModel = await databaseService.delete(tableName, id);
      return deletedModel;
    } catch (error) {
      throw new Error(`Error deleting from ${tableName}: ${error.message}`);
    }
  },

  async readById(tableName, id) {
    try {
      const query = `SELECT * FROM ${tableName} WHERE id = $1`;
      const result = await databaseService.query(query, [id]);
      return result[0];
    } catch (error) {
      throw new Error(
        `Error reading from ${tableName} by id: ${error.message}`,
      );
    }
  },

  async getActive(tableName) {
    try {
      const query = `SELECT * FROM ${tableName} WHERE active = true`;
      const result = await databaseService.query(query);
      return result;
    } catch (error) {
      throw new Error(
        `Error fetching active records from ${tableName}: ${error.message}`,
      );
    }
  },

  async getInactive(tableName) {
    try {
      const query = `SELECT * FROM ${tableName} WHERE active = false`;
      const result = await databaseService.query(query);
      return result;
    } catch (error) {
      throw new Error(
        `Error fetching inactive records from ${tableName}: ${error.message}`,
      );
    }
  },

  async query(query, params) {
    try {
      const result = await databaseService.query(query, params);
      return result;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  },
};

module.exports = baseCollection;
