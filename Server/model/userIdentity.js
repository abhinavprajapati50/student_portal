const DataTypes = require("sequelize");
const sequelizeDBConfig = require("../config/db.config");

//sequelizeDBConfig.sequelize.define

const userIdentity = sequelizeDBConfig.sequelize.define(
	"user_identity",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "user_identity",
		updatedAt: false,
		createdAt: false,
	}
);

module.exports = userIdentity;
