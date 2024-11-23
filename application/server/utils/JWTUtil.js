const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const jwtTokenService = require("../services/jwtTokenService");
const logger = require("./logger");

const generateToken = (payload, expiresIn = "1h") => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  try {
    if (!token) {
      logger.error("Token verification failed: Token is null");
      return null;
    }
    return jwt.verify(token, secretKey);
  } catch (error) {
    logger.error("Token verification failed:", error);
    return null;
  }
};

const isTokenRevoked = async (token) => {
  try {
    const tokenRecord = await jwtTokenService.readById(token);
    return tokenRecord && tokenRecord.revoked;
  } catch (error) {
    logger.error("Error checking if token is revoked:", error);
    return true;
  }
};

const verifyTokenWithRevocationCheck = async (token) => {
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return null;
  }

  const revoked = await isTokenRevoked(token);
  if (revoked) {
    return null;
  }

  return decodedToken;
};

const extractRoleFromToken = async (token) => {
  const decodedToken = await verifyTokenWithRevocationCheck(token);
  if (decodedToken) {
    return decodedToken.role;
  }
  return null;
};

const extractUserIdFromToken = async (token) => {
  const decodedToken = await verifyTokenWithRevocationCheck(token);
  if (decodedToken) {
    return decodedToken.id;
  }
  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  verifyTokenWithRevocationCheck,
  extractRoleFromToken,
  extractUserIdFromToken,
  isTokenRevoked,
};
