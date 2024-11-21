const service = require('../_services/userService');

const userController = {
	  getAll: async (req, res) => {
	try {
	  const users = await service.getAll();
	  res.status(200).json(users);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  },
  create: async (req, res) => {
	try {
		return new Error("Not Implemented Yet");
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }
};

module.exports = userController;