const express = require('express');
const router = express.Router();

const taskController = require('../_controllers/taskController');
const noteController = require('../_controllers/noteController');
const userController = require('../_controllers/userController');
const jwtTokenController = require('../_controllers/jwtTokenController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.post('/notes', noteController.addNote);
router.get('/users', userController.getAll);
router.post('/users', userController.create);
router.post('/login', userController.login);

router.get('/jwt-tokens', jwtTokenController.getAllTokens);
router.post('/jwt-tokens', jwtTokenController.createToken);
router.put('/jwt-tokens/:id', jwtTokenController.updateToken);
router.delete('/jwt-tokens/:id', jwtTokenController.deleteToken);
router.get('/jwt-tokens/:id', jwtTokenController.getTokenById);

router.get('/user-info', userController.getUserInfo);

module.exports = router;
