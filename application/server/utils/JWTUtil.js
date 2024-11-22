const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload, expiresIn = "1h") => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

const extractRoleFromToken = (token) => {
  const decodedToken = verifyToken(token);
  if (decodedToken) {
    return decodedToken.role;
  }
  return null;
};

const extractUserIdFromToken = (token) => {
  const decodedToken = verifyToken(token);
  if (decodedToken) {
    return decodedToken.id;
  }
  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractRoleFromToken,
  extractUserIdFromToken,
};
