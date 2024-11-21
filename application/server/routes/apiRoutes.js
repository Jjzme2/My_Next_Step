const express = require('express');
const router = express.Router();
const taskController = require('../_controllers/taskController');
const noteController = require('../_controllers/noteController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.post('/notes', noteController.addNote);

module.exports = router;
