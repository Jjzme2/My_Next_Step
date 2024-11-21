const pool = require("../config/db");

class User {
  constructor({ id, username, password, email, created_at, role }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.created_at = created_at || new Date();
    this.role = role || 'user';
  }

  async save() {
    const query = `
      INSERT INTO users (id, username, password, email, created_at, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [this.id, this.username, this.password, this.email, this.created_at, this.role];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving user: " + error.message);
    }
  }

  static async findByToken(token) {
    const query = `
      SELECT users.* FROM users
      JOIN jwt_tokens ON users.id = jwt_tokens.user_id
      WHERE jwt_tokens.token = $1;
    `;
    const values = [token];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error finding user by token: " + error.message);
    }
  }
}

module.exports = User;
