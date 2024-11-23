// utils/JWTUtil.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const jwtTokenService = require("../services/jwtTokenService");

// Generates a JWT token with the given payload and optional expiration time
const generateToken = (payload, expiresIn = "1h") => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Verifies a JWT token and returns the decoded payload if valid, otherwise null
const verifyToken = (token) => {
  try {
    if (!token) {
      console.error("Token verification failed: Token is null");
      return null;
    }
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// Checks if a token is revoked using the token service
const isTokenRevoked = async (token) => {
  try {
    const tokenRecord = await jwtTokenService.readById(token);
    return tokenRecord && tokenRecord.revoked;
  } catch (error) {
    console.error("Error checking if token is revoked:", error);
    return true; // Default to revoked if an error occurs to maintain security
  }
};

// Verifies a token and ensures it has not been revoked
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

// Extracts the role from a verified token (assuming token verification has been completed)
const extractRoleFromToken = async (token) => {
  const decodedToken = await verifyTokenWithRevocationCheck(token);
  if (decodedToken) {
    return decodedToken.role;
  }
  return null;
};

// Extracts the user ID from a verified token (assuming token verification has been completed)
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
