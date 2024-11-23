const JWTUtil = require("../utils/JWTUtil");
const logger = require("../utils/logger");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("Unauthorized access attempt: Token not found");
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token not found" });
  }

  const verifiedToken = await JWTUtil.verifyTokenWithRevocationCheck(token);
  if (!verifiedToken) {
    logger.warn("Forbidden access attempt: Invalid or revoked token");
    return res
      .status(403)
      .json({ error: "Forbidden", message: "Invalid or revoked token" });
  }

  req.user = verifiedToken;
  logger.info(`Token verified for user: ${req.user.id}`);

  next();
};

module.exports = authMiddleware;
