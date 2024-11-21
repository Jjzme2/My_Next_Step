const pool = require("../config/db");

class User {
  constructor({ username, password, email, created_at }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.created_at = created_at || new Date();
  }

  async save() {
    const query = `
      INSERT INTO users (username, password, email, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [this.username, this.password, this.email, this.created_at];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving user: " + error.message);
    }
  }
}

module.exports = User;
