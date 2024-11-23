const BaseModel = require("./BaseModel");

class Role extends BaseModel {
  constructor({ id, name, description }) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
  }

  async save() {
    const query = `
      INSERT INTO roles (id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [this.id, this.name, this.description];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error saving role: " + error.message);
    }
  }

  async update() {
    const query = `
      UPDATE roles
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [this.name, this.description, this.id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error updating role: " + error.message);
    }
  }

  async delete() {
    const query = `DELETE FROM roles WHERE id = $1 RETURNING *;`;
    const values = [this.id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error("Error deleting role: " + error.message);
    }
  }
}

module.exports = Role;
