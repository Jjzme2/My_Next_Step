const pool = require("../config/db");

const Task = {
  getAll: async () => {
    const res = await pool.query("SELECT * FROM tasks");
    return res.rows;
  },
  create: async (taskData) => {
    const { title, description } = taskData;
    const res = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return res.rows[0];
  },
};

module.exports = Task;
