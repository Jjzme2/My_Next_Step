const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const noteController = require("../controllers/noteController");
const userController = require("../controllers/userController");
const jwtTokenController = require("../controllers/jwtTokenController");

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
router.post("/notes", noteController.addNote);
router.get("/users", userController.getAll);
router.post("/users", userController.create);

router.get("/jwt-tokens", jwtTokenController.getAllTokens);
router.post("/jwt-tokens", jwtTokenController.createToken);
router.put("/jwt-tokens/:id", jwtTokenController.updateToken);
router.delete("/jwt-tokens/:id", jwtTokenController.deleteToken);
router.get("/jwt-tokens/:id", jwtTokenController.getTokenById);
router.post("/jwt-tokens/revoke", jwtTokenController.revokeToken);

module.exports = router;
