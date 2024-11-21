const pool = require("../config/db");

const database = {
	async connect() {
		try {
			await pool.connect();
			console.log("Connected to the database");
		} catch (error) {
			console.error("Failed to connect to the database", error);
		}
}
};

module.exports = database;