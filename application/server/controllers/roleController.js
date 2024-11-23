const roleService = require("../services/roleService");
const logger = require("../utils/logger");

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await roleService.getAll();
      logger.info("Fetched all roles successfully");
      res.status(200).json(roles);
    } catch (error) {
      logger.error(`Error fetching roles: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },
  createRole: async (req, res) => {
    try {
      const newRole = await roleService.create(req.body);
      logger.info("Created new role successfully");
      res.status(201).json(newRole);
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = roleController;
