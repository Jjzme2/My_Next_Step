const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page", // Dynamic title for the page
  });
});

module.exports = router;
