const express = require('express');
const router = express.Router();
const taskController = require('../_controllers/taskController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);

module.exports = router;
