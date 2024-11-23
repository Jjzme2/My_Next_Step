const baseCollection = require("./baseCollection");
const Role = require("../models/Role");
const logger = require("../utils/logger");

const RoleService = {
  async getAll() {
    try {
      const roles = await baseCollection.getAll("roles");
      logger.info("Fetched all roles successfully");
      return roles;
    } catch (error) {
      logger.error(`Error fetching roles: ${error.message}`);
      throw error;
    }
  },
  async create(data) {
    try {
      const newRole = await baseCollection.create("roles", Role, data);
      logger.info("Created new role successfully");
      return newRole;
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      throw error;
    }
  },
  async update(id, data) {
    try {
      const updatedRole = await baseCollection.update("roles", id, data);
      logger.info(`Updated role with ID ${id} successfully`);
      return updatedRole;
    } catch (error) {
      logger.error(`Error updating role with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async delete(id) {
    try {
      const deletedRole = await baseCollection.delete("roles", id);
      logger.info(`Deleted role with ID ${id} successfully`);
      return deletedRole;
    } catch (error) {
      logger.error(`Error deleting role with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async readById(id) {
    try {
      const role = await baseCollection.readById("roles", id);
      logger.info(`Fetched role with ID ${id} successfully`);
      return role;
    } catch (error) {
      logger.error(`Error fetching role with ID ${id}: ${error.message}`);
      throw error;
    }
  },
};

module.exports = RoleService;
