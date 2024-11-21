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
			const { rows }
			= await pool.query(text, params);
			const duration = Date.now() - start;
			console.log("Executed query", { text, duration, rows });
			return rows;
		}
		catch (error) {
			console.error("Error executing query", error);
			throw error;
		}
	},
};

module.exports = database;