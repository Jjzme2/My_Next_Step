const baseCollection = require("../services/baseCollection");
const Model = require("../models/Task");
const logger = require("../utils/logger");
const authMiddleware = require("../middleware/authMiddleware");

const tableName = "tasks";

const TaskCollection = {
  async getAll() {
    try {
      const tasks = await baseCollection.getAll(tableName);
      logger.info("Fetched all tasks successfully");
      return tasks;
    } catch (error) {
      logger.error(`Error fetching tasks: ${error.message}`);
      throw error;
    }
  },
  async create(data) {
    try {
      const newTask = await baseCollection.create(tableName, Model, data);
      logger.info("Created new task successfully");
      return newTask;
    } catch (error) {
      logger.error(`Error creating task: ${error.message}`);
      throw error;
    }
  },
  async update(id, data) {
    try {
      const updatedTask = await baseCollection.update(tableName, id, data);
      logger.info(`Updated task with ID ${id} successfully`);
      return updatedTask;
    } catch (error) {
      logger.error(`Error updating task with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async delete(id) {
    try {
      const deletedTask = await baseCollection.delete(tableName, id);
      logger.info(`Deleted task with ID ${id} successfully`);
      return deletedTask;
    } catch (error) {
      logger.error(`Error deleting task with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async readById(id) {
    try {
      const task = await baseCollection.readById(tableName, id);
      logger.info(`Fetched task with ID ${id} successfully`);
      return task;
    } catch (error) {
      logger.error(`Error fetching task with ID ${id}: ${error.message}`);
      throw error;
    }
  },
  async getActive() {
    try {
      const activeTasks = await baseCollection.getActive(tableName);
      logger.info("Fetched active tasks successfully");
      return activeTasks;
    } catch (error) {
      logger.error(`Error fetching active tasks: ${error.message}`);
      throw error;
    }
  },
  async getInactive() {
    try {
      const inactiveTasks = await baseCollection.getInactive(tableName);
      logger.info("Fetched inactive tasks successfully");
      return inactiveTasks;
    } catch (error) {
      logger.error(`Error fetching inactive tasks: ${error.message}`);
      throw error;
    }
  },
};

module.exports = TaskCollection;
