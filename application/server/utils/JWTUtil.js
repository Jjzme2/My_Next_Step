const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload, expiresIn = '1h') => {
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

module.exports = {
  generateToken,
  verifyToken,
  extractRoleFromToken,
};
