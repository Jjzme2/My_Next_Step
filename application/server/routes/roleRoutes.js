const express = require("express");
const roleController = require("../controllers/roleController");

const router = express.Router();

router.get("/roles", roleController.getAllRoles);
router.post("/roles", roleController.createRole);

module.exports = router;
