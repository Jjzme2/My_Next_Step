const authService = require("../services/authService");
const jwtTokenService = require("../services/jwtTokenService");
const JWTUtil = require("../utils/JWTUtil");
const roleService = require("../services/roleService");
const logger = require("../utils/logger"); // Import the logger module
const authMiddleware = require("../middleware/authMiddleware"); // Import the authMiddleware module

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
  logout: async (req, res) => {
    try {
      const { token } = req.body;
      await authService.logout(token);
      await jwtTokenService.revoke(token);
      logger.info(`User logged out successfully`); // Add logging statement
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      logger.error(`Logout failed: ${error.message}`); // Add logging statement
      res.status(500).json({ error: error.message });
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
  getUserInfo: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logger.warn(`Unauthorized access attempt`); // Add logging statement
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const userId = await JWTUtil.extractUserIdFromToken(token);
      if (!userId) {
        logger.warn(`Unauthorized access attempt with invalid token`); // Add logging statement
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await authService.getUserInfo(userId);
      if (!user) {
        logger.warn(`User not found for token`); // Add logging statement
        return res.status(404).json({ error: "User not found" });
      }

      logger.info(`User info retrieved for user ${user.username}`); // Add logging statement
      res
        .status(200)
        .json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      logger.error(`Failed to retrieve user info: ${error.message}`); // Add logging statement
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
