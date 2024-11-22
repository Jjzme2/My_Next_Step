const pool = require("../config/db");
const bcrypt = require('bcrypt');
const stringUtil = require("../utils/stringUtils.js");

class User {
  constructor({ id, username, password, email, created_at, role }) {
    this.id = id?? stringUtil.generateUUID();
    this.username = username;
    this.password = password;
    this.email = email;
    this.created_at = created_at || new Date();
    this.role = role || "5a7372b5-5761-409c-91b5-95bce1364839";
  }

  async save() {
	console.log("Attempting to save user: ", this);
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

  static async findByUsername(username) {
	const query = "SELECT * FROM users WHERE username = $1;";
	const values = [username];

	try {
	  const res = await pool.query(query, values);
	  return res.rows[0];
	}
	catch (error) {
	  throw new Error("Error finding user by username: " + error.message);
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

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
