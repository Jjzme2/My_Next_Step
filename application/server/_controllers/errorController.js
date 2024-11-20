function NotImplementedYetError(req, res) {
  res.status(500).send("Not implemented yet");
}

module.exports = {
	  NotImplementedYetError,
};