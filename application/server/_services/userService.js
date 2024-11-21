const database = require("./databaseService");
const User = require("../_models/User");

const UserCollection = {
  async getAll() {
    try {
      const query = "SELECT * FROM users";
      const users = await database.query(query);
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  },
  async create(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },
};

module.exports = UserCollection;
