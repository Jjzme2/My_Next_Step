const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
const jwtTokenService = require("../_services/jwtTokenService");

const generateToken = (payload, expiresIn = "1h") => {
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const isRevoked = await isTokenRevoked(token);
    if (isRevoked) {
      return null;
    }
    return decodedToken;
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

const isTokenRevoked = async (token) => {
  const tokenRecord = await jwtTokenService.readById(token);
  return tokenRecord && tokenRecord.revoked;
};

module.exports = {
  generateToken,
  verifyToken,
  extractRoleFromToken,
  extractUserIdFromToken,
  isTokenRevoked,
};
