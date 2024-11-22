const pool = require("../config/db");
const stringUtil = require("../utils/stringUtils.js");

class JwtToken {
  constructor({ id, user_id, token, created_at, expires_at, revoked }) {
    this.id = id || stringUtil.generateUUID();
    this.user_id = user_id;
    this.token = token;
    this.created_at = created_at || new Date();
    this.expires_at = expires_at;
    this.revoked = revoked || false;
  }

  async save() {
    const query = `
      INSERT INTO jwt_tokens (id, user_id, token, created_at, expires_at, revoked)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [this.id, this.user_id, this.token, this.created_at, this.expires_at, this.revoked];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving JWT token: " + error.message);
    }
  }
}

module.exports = JwtToken;
