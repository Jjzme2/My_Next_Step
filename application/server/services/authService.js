const bcrypt = require("bcrypt");
const User = require("../models/User");
const logger = require("../utils/logger");

const authService = {
  register: async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    logger.info(`User ${username} registered successfully`);
    return newUser;
  },
};

module.exports = authService;
