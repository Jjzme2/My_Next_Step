const pool = require("../config/db");

class JwtToken {
  constructor({ id, user_id, token, created_at, expires_at }) {
    this.id = id;
    this.user_id = user_id;
    this.token = token;
    this.created_at = created_at || new Date();
    this.expires_at = expires_at;
  }

  async save() {
    const query = `
      INSERT INTO jwt_tokens (id, user_id, token, created_at, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [this.id, this.user_id, this.token, this.created_at, this.expires_at];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving JWT token: " + error.message);
    }
  }
}

module.exports = JwtToken;
