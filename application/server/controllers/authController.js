const authService = require("../services/authService");
const roleService = require("../services/roleService");
const logger = require("../utils/logger"); // Import the logger module

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      const user = await authService.getUserInfo(token);
      const role = await roleService.getRoleByName(user.role);
      req.session.user = user;
      logger.info(`User ${username} logged in successfully`); // Add logging statement
      res.status(200).json({ token, username, user, role: role.name });
    } catch (error) {
      logger.error(
        `Login failed for user ${req.body.username}: ${error.message}`,
      ); // Add logging statement
      res.status(401).json({ error: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = await authService.register(username, password, email);
      logger.info(`User ${username} registered successfully`); // Add logging statement
      res.status(201).json(newUser);
    } catch (error) {
      logger.error(
        `Registration failed for user ${req.body.username}: ${error.message}`,
      ); // Add logging statement
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
