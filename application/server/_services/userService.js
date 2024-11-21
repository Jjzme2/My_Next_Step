const database = require("./databaseService");
const User = require("../_models/User");

const tableName = "users";

const UserCollection = {
  async getAll() {
    try {
      const collection = await database.list(tableName);
      return collection;
    } catch (error) {
      throw new Error(
        `Error fetching ${tableName.charAt(0).toUpperCase() + tableName.slice(1)}: ` + error.message
      );
    }
  },
  async create(data) {
    try {
      const newModel = new Model(data);
      const savedModel = await newModel.save();
      return savedModel;
    } catch (error) {
      throw new Error(
        `Error creating ${tableName.charAt(0).toUpperCase() + tableName.slice(1)}: ` + error.message
      );
    }
  },
};

module.exports = UserCollection;
