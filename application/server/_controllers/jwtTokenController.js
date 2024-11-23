const jwtTokenService = require("../_services/jwtTokenService");

exports.getAllTokens = async (req, res) => {
  try {
    const tokens = await jwtTokenService.getAll();
    res.json(tokens);
  } catch (error) {
    res.status(500).send("Error fetching tokens");
  }
};

exports.createToken = async (req, res) => {
  try {
    const newToken = await jwtTokenService.create(req.body);
    res.json(newToken);
  } catch (error) {
    res.status(500).send("Error creating token");
  }
};

exports.updateToken = async (req, res) => {
  try {
    const updatedToken = await jwtTokenService.update(req.params.id, req.body);
    res.json(updatedToken);
  } catch (error) {
    res.status(500).send("Error updating token");
  }
};

exports.deleteToken = async (req, res) => {
  try {
    await jwtTokenService.revoke(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error revoking token");
  }
};

exports.getTokenById = async (req, res) => {
  try {
    const token = await jwtTokenService.readById(req.params.id);
    res.json(token);
  } catch (error) {
    res.status(500).send("Error fetching token");
  }
};

exports.revokeToken = async (req, res) => {
  try {
    await jwtTokenService.revoke(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error revoking token");
  }
};
