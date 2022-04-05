/** @format */

require("dotenv").config();
const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
	process.env.DB_COLLECTION_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		dialectOptions: {
			useUTC: false,
			dateStrings: true,
			typeCast: true,
		},
		logging: false,
	}
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
