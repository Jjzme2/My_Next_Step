const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");
const noteController = require("../controllers/noteController");
const userController = require("../controllers/userController");
const jwtTokenController = require("../controllers/jwtTokenController");

router.get("/tasks", authMiddleware, taskController.getAllTasks);
router.post("/tasks", authMiddleware, taskController.createTask);
router.post("/notes", authMiddleware, noteController.addNote);
router.get("/users", authMiddleware, userController.getAll);
router.post("/users", authMiddleware, userController.create);

router.get("/jwt-tokens", authMiddleware, jwtTokenController.getAllTokens);
router.post("/jwt-tokens", authMiddleware, jwtTokenController.createToken);
router.put("/jwt-tokens/:id", authMiddleware, jwtTokenController.updateToken);
router.delete("/jwt-tokens/:id", authMiddleware, jwtTokenController.deleteToken);
router.get("/jwt-tokens/:id", authMiddleware, jwtTokenController.getTokenById);
router.post("/jwt-tokens/revoke", authMiddleware, jwtTokenController.revokeToken);

module.exports = router;
