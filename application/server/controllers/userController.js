const bcrypt = require("bcrypt");
const service = require("../services/userService");
const JWTUtil = require("../utils/JWTUtil");
const jwtTokenService = require("../services/jwtTokenService");
const authMiddleware = require("../middleware/authMiddleware");

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
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await service.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
