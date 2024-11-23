const JWTUtil = require("../utils/JWTUtil");
const logger = require("../utils/logger"); // Import the logger module

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("Unauthorized access attempt: Token not found"); // Add logging statement
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token not found" });
  }

  const verifiedToken = await JWTUtil.verifyTokenWithRevocationCheck(token);
  if (!verifiedToken) {
    logger.warn("Forbidden access attempt: Invalid or revoked token"); // Add logging statement
    return res
      .status(403)
      .json({ error: "Forbidden", message: "Invalid or revoked token" });
  }

  req.user = verifiedToken; // Attach the decoded token (which contains user info) to the request object
  logger.info(`Token verified for user: ${req.user.id}`); // Add logging statement

  next();
};

module.exports = authMiddleware;
