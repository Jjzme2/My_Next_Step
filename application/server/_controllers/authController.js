const authService = require('../_services/authService');

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      const { token } = req.body;
      await authService.logout(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = await authService.register(username, password, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
