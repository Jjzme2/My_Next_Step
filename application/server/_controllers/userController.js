const bcrypt = require('bcrypt');
const service = require('../_services/userService');
const JWTUtil = require('../utils/JWTUtil');
const jwtTokenService = require('../_services/jwtTokenService');

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
      const newUser = await service.create({ ...req.body, password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await service.findByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log("User found. Generating token...");
      const token = JWTUtil.generateToken({ id: user.id, role: user.role });
      
      // Save the token in the jwt_tokens table
      const jwtTokenData = {
        user_id: user.id,
        token: token,
        expires_at: new Date(Date.now() + 3600000) // 1 hour from now
      };
      await jwtTokenService.create(jwtTokenData);

      res.status(200).json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUserInfo: async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await service.findByToken(token);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
