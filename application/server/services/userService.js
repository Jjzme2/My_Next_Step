const baseCollection = require("../services/baseCollection");
const User = require("../models/User");
const logger = require("../utils/logger");

const tableName = "users";

const UserCollection = {
  async getAll() {
    logger.info("Fetching all users");
    const users = await baseCollection.getAll(tableName);
    logger.info("Fetched all users successfully");
    return users;
  },
  async create(data) {
    logger.info("Creating a new user");
    const hashedPassword = await User.hashPassword(data.password);
    const newData = { ...data, password: hashedPassword };
    const newUser = await baseCollection.create(tableName, User, newData);
    logger.info("Created new user successfully");
    return newUser;
  },
  async update(id, data) {
    logger.info(`Updating user with ID ${id}`);
    const updatedUser = await baseCollection.update(tableName, id, data);
    logger.info(`Updated user with ID ${id} successfully`);
    return updatedUser;
  },
  async delete(id) {
    logger.info(`Deleting user with ID ${id}`);
    const deletedUser = await baseCollection.delete(tableName, id);
    logger.info(`Deleted user with ID ${id} successfully`);
    return deletedUser;
  },
  async readById(id) {
    logger.info(`Fetching user with ID ${id}`);
    const user = await baseCollection.readById(tableName, id);
    logger.info(`Fetched user with ID ${id} successfully`);
    return user;
  },
  async getActive() {
    logger.info("Fetching active users");
    const activeUsers = await baseCollection.getActive(tableName);
    logger.info("Fetched active users successfully");
    return activeUsers;
  },
  async getInactive() {
    logger.info("Fetching inactive users");
    const inactiveUsers = await baseCollection.getInactive(tableName);
    logger.info("Fetched inactive users successfully");
    return inactiveUsers;
  },
  async findByUsername(username) {
    logger.info(`Fetching user with username ${username}`);
    const query = `SELECT * FROM ${tableName} WHERE username = $1`;
    const result = await baseCollection.query(query, [username]);
    logger.info(`Fetched user with username ${username} successfully`);
    return result[0];
  },
  async findByToken(token) {
    logger.info("Fetching user by token");
    const user = await User.findByToken(token);
    logger.info("Fetched user by token successfully");
    return user;
  },
};

module.exports = UserCollection;
