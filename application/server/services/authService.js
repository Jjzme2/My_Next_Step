const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWTUtil = require("../utils/JWTUtil");
const jwtTokenService = require("../services/jwtTokenService");
const logger = require("../utils/logger");

const authService = {
  login: async (username, password) => {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      if (!user) {
        logger.warn("User not found");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        logger.warn("Password does not match");
        console.table({ password, userPassword: user.password });
      }

      throw new Error("Invalid credentials");
    }
    const token = JWTUtil.generateToken({ id: user.id, role: user.role });
    await jwtTokenService.create({ user_id: user.id, token });
    logger.info(`User ${username} logged in successfully`);
    return token;
  },
  logout: async (token) => {
    await JWTUtil.revokeToken(token);
    await jwtTokenService.revoke(token);
    logger.info("User logged out successfully");
  },
  register: async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    logger.info(`User ${username} registered successfully`);
    return newUser;
  },
  getUserInfo: async (token) => {
    const user = await User.findByToken(token);
    logger.info(`User info retrieved for user ${user.username}`);
    return { id: user.id, username: user.username, role: user.role };
  },
};

module.exports = authService;
