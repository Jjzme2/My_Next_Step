class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new TypeError("Cannot construct BaseModel instances directly");
    }
  }

  async getInstance() {
    return this;
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const values = [id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Error finding ${this.tableName} by id: ${error.message}`,
      );
    }
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;

    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      throw new Error(`Error finding all ${this.tableName}: ${error.message}`);
    }
  }

  async save() {
    const query = `
      INSERT INTO ${this.constructor.tableName} (${Object.keys(this).join(", ")})
      VALUES (${Object.values(this)
        .map((_, i) => `$${i + 1}`)
        .join(", ")})
      RETURNING *;
    `;
    const values = Object.values(this);

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Error saving ${this.constructor.tableName}: ${error.message}`,
      );
    }
  }

  async update() {
    const query = `
      UPDATE ${this.constructor.tableName}
      SET ${Object.keys(this)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ")}
      WHERE id = $${Object.keys(this).length + 1}
      RETURNING *;
    `;
    const values = [...Object.values(this), this.id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Error updating ${this.constructor.tableName}: ${error.message}`,
      );
    }
  }

  async delete() {
    const query = `DELETE FROM ${this.constructor.tableName} WHERE id = $1 RETURNING *;`;
    const values = [this.id];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Error deleting ${this.constructor.tableName}: ${error.message}`,
      );
    }
  }
}

module.exports = BaseModel;
