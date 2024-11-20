const Task = require("../_models/Task");
const errorController = require("./errorController");

exports.getAllTasks = async (req, res) => {
	errorController.NotImplementedYetError(req, res);
	//   try {
//     const tasks = await Task.getAll();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).send("Error fetching tasks");
//   }
};

exports.createTask = async (req, res) => {
	errorController.NotImplementedYetError(req, res);
	//   try {
//     const newTask = await Task.create(req.body);
//     res.json(newTask);
//   } catch (error) {
//     res.status(500).send("Error creating task");
//   }
};
