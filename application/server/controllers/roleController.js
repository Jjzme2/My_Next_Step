const roleService = require("../services/roleService");

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await roleService.getAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createRole: async (req, res) => {
    try {
      const newRole = await roleService.create(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = roleController;
