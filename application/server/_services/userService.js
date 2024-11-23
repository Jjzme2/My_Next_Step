const baseCollection = require("../_services/baseCollection");
const User = require("../_models/User");

const tableName = "users";

const UserCollection = {
  async getAll() {
    return baseCollection.getAll(tableName);
  },
  async create(data) {
    const hashedPassword = await User.hashPassword(data.password);
    const newData = { ...data, password: hashedPassword };
    return baseCollection.create(tableName, User, newData);
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
  async findByUsername(username) {
    const query = `SELECT * FROM ${tableName} WHERE username = $1`;
    const result = await baseCollection.query(query, [username]);
    return result[0];
  },
  async findByToken(token) {
    return User.findByToken(token);
  },
};

module.exports = UserCollection;
