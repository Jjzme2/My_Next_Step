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
      const newUser = await service.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await service.findByUsername(username);
      if (!user || user.password !== password) {
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

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
