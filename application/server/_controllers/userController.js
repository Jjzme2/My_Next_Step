const service = require('../_services/userService');
const JWTUtil = require('../utils/JWTUtil');

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
      const newUser = await service.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const { username, password } = req.body;
    try {
      const user = await service.findByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = JWTUtil.generateToken({ id: user.id, role: user.role });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
