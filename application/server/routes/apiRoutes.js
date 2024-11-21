const express = require('express');
const router = express.Router();

const taskController = require('../_controllers/taskController');
const noteController = require('../_controllers/noteController');
const userController = require('../_controllers/userController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.post('/notes', noteController.addNote);
router.get('/users', userController.getAll);
router.post('/users', userController.create);

module.exports = router;
