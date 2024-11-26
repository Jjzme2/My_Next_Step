const express = require("express");
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/roles", authMiddleware, roleController.getAllRoles);
router.post("/roles", authMiddleware, roleController.createRole);

module.exports = router;
