const pool = require("../config/db");
const stringUtil = require("../utils/stringUtils.js");

class JwtToken {
  constructor({ id, user_id, token, created_at, expires_at, revoked }) {
    this.id = id || stringUtil.generateUUID();
    this.user_id = user_id;
    this.token = token;
    this.created_at = created_at || new Date();
    this.expires_at = expires_at || new Date();
    this.revoked = revoked || false;
  }

  async save() {
    const query = `
      INSERT INTO jwt_tokens (id, user_id, token, created_at, expires_at, revoked)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      this.id,
      this.user_id,
      this.token,
      this.created_at,
      this.expires_at,
      this.revoked,
    ];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving JWT token: " + error.message);
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM jwt_tokens WHERE id = $1`;
    const values = [id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(`Error finding JWT token by id: ${error.message}`);
    }
  }

  static async findAll() {
    const query = `SELECT * FROM jwt_tokens`;

    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      throw new Error(`Error finding all JWT tokens: ${error.message}`);
    }
  }

  async update() {
    const query = `
      UPDATE jwt_tokens
      SET user_id = $1, token = $2, created_at = $3, expires_at = $4, revoked = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      this.user_id,
      this.token,
      this.created_at,
      this.expires_at,
      this.revoked,
      this.id,
    ];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(`Error updating JWT token: ${error.message}`);
    }
  }

  async delete() {
    const query = `DELETE FROM jwt_tokens WHERE id = $1 RETURNING *;`;
    const values = [this.id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(`Error deleting JWT token: ${error.message}`);
    }
  }
}

module.exports = JwtToken;
