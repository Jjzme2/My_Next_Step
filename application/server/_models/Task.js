const pool = require("../config/db");
const stringUtil = require("../utils/stringUtils.js");

const Task = {
  constructor({ id, title, description, created_at }) {
    this.id = id || stringUtil.generateUUID();
    this.title = title;
    this.description = description;
    this.created_at = created_at || new Date();
  },

  async save() {
    const query = `
			INSERT INTO tasks (id, title, description, created_at)
			VALUES ($1, $2, $3, $4)
			RETURNING *;
		`;
    const values = [this.id, this.title, this.description, this.created_at];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving task: " + error.message);
    }
  },
};

module.exports = Task;
