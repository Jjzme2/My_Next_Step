const authService = require('../_services/authService');

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.status(200).json({ token, username });
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
  },
  getUserInfo: async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await authService.getUserInfo(token);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
