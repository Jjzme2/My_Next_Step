const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
  res.render("pages/login", {
    title: "Wiki Home Page",
  });
});
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
router.get("/user-info", authMiddleware, authController.getUserInfo);

module.exports = router;
