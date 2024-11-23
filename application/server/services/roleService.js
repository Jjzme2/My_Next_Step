const baseCollection = require("./baseCollection");
const Role = require("../models/Role");

const RoleService = {
  async getAll() {
    return baseCollection.getAll("roles");
  },
  async create(data) {
    return baseCollection.create("roles", Role, data);
  },
  async update(id, data) {
    return baseCollection.update("roles", id, data);
  },
  async delete(id) {
    return baseCollection.delete("roles", id);
  },
  async readById(id) {
    return baseCollection.readById("roles", id);
  },
};

module.exports = RoleService;
