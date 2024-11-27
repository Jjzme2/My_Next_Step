const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");
const noteController = require("../controllers/noteController");
const userController = require("../controllers/userController");

router.get("/tasks", authMiddleware, taskController.getAllTasks);
router.post("/tasks", authMiddleware, taskController.createTask);
router.post("/notes", authMiddleware, noteController.addNote);
router.get("/users", authMiddleware, userController.getAll);
router.post("/users", authMiddleware, userController.create);

module.exports = router;
