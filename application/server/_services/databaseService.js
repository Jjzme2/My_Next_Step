const pool = require("../config/db");

const database = {
	async connect() {
		try {
			await pool.connect();
			console.log("Connected to the database");
		} catch (error) {
			console.error("Failed to connect to the database", error);
		}
	},

	async disconnect() {
		try {
			await pool.end();
			console.log("Disconnected from the database");
		} catch (error) {
			console.error("Failed to disconnect from the database", error);
		}
	},

	async query(text, params) {
		try {
			const start = Date.now();
			const { rows } = await pool.query(text, params);
			const duration = Date.now() - start;
			console.log("Executed query", { text, duration, rows });
			return rows;
		} catch (error) {
			console.error("Error executing query", error);
			throw error;
		}
	},

	async list(table) {
		try {
			const query = `SELECT * FROM ${table}`;
			const rows = await this.query(query);
			return rows;
		} catch (error) {
			console.error(`Error listing from ${table}`, error);
			throw error;
		}
	},

	async create(table, data) {
		try {
			const keys = Object.keys(data).join(", ");
			const values = Object.values(data);
			const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
			const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;
			const rows = await this.query(query, values);
			return rows[0];
		} catch (error) {
			console.error(`Error creating in ${table}`, error);
			throw error;
		}
	},

	async update(table, id, data) {
		try {
			const keys = Object.keys(data);
			const values = Object.values(data);
			const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
			const query = `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
			const rows = await this.query(query, [...values, id]);
			return rows[0];
		} catch (error) {
			console.error(`Error updating in ${table}`, error);
			throw error;
		}
	},

	async delete(table, id) {
		try {
			const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
			const rows = await this.query(query, [id]);
			return rows[0];
		} catch (error) {
			console.error(`Error deleting from ${table}`, error);
			throw error;
		}
	},
};

module.exports = database;
