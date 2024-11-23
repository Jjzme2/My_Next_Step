const JWTUtil = require("../utils/JWTUtil");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token not found" });
  }

  const verifiedToken = await JWTUtil.verifyTokenWithRevocationCheck(token);
  if (!verifiedToken) {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "Invalid or revoked token" });
  }

  req.user = verifiedToken; // Attach the decoded token (which contains user info) to the request object

  next();
};

module.exports = authMiddleware;
