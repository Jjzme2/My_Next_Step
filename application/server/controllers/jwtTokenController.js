const jwtTokenService = require("../services/jwtTokenService");
const logger = require("../utils/logger"); // Import the logger module

exports.getAllTokens = async (req, res) => {
  try {
    const tokens = await jwtTokenService.getAll();
    logger.info("Fetched all tokens successfully"); // Add logging statement
    res.json(tokens);
  } catch (error) {
    logger.error(`Error fetching tokens: ${error.message}`); // Add logging statement
    res.status(500).send("Error fetching tokens");
  }
};

exports.createToken = async (req, res) => {
  try {
    const newToken = await jwtTokenService.create(req.body);
    logger.info("Created new token successfully"); // Add logging statement
    res.json(newToken);
  } catch (error) {
    logger.error(`Error creating token: ${error.message}`); // Add logging statement
    res.status(500).send("Error creating token");
  }
};

exports.updateToken = async (req, res) => {
  try {
    const updatedToken = await jwtTokenService.update(req.params.id, req.body);
    logger.info(`Updated token with ID ${req.params.id} successfully`); // Add logging statement
    res.json(updatedToken);
  } catch (error) {
    logger.error(
      `Error updating token with ID ${req.params.id}: ${error.message}`,
    ); // Add logging statement
    res.status(500).send("Error updating token");
  }
};

exports.deleteToken = async (req, res) => {
  try {
    await jwtTokenService.revoke(req.params.id);
    logger.info(`Revoked token with ID ${req.params.id} successfully`); // Add logging statement
    res.status(204).send();
  } catch (error) {
    logger.error(
      `Error revoking token with ID ${req.params.id}: ${error.message}`,
    ); // Add logging statement
    res.status(500).send("Error revoking token");
  }
};

exports.getTokenById = async (req, res) => {
  try {
    const token = await jwtTokenService.readById(req.params.id);
    logger.info(`Fetched token with ID ${req.params.id} successfully`); // Add logging statement
    res.json(token);
  } catch (error) {
    logger.error(
      `Error fetching token with ID ${req.params.id}: ${error.message}`,
    ); // Add logging statement
    res.status(500).send("Error fetching token");
  }
};

exports.revokeToken = async (req, res) => {
  try {
    await jwtTokenService.revoke(req.params.id);
    logger.info(`Revoked token with ID ${req.params.id} successfully`); // Add logging statement
    res.status(204).send();
  } catch (error) {
    logger.error(
      `Error revoking token with ID ${req.params.id}: ${error.message}`,
    ); // Add logging statement
    res.status(500).send("Error revoking token");
  }
};
