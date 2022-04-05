const express = require("express");
const cors = require("cors");
const sequelizeDBConfig = require("./config/db.config");
const bodyParser = require("body-parser");

// routes module import
const authRoutes = require("./routes/authRoutes");

// Server configuration
const app = express();

const corsOptions = {
	origin: process.env.CORS_URL,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept",
		"Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTION",
		"Access-Control-Allow-Origin",
		"*"
	);
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "Welcome" });
});

// auth routes
app.use("/api/v1/auth", authRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
sequelizeDBConfig.sequelize
	.sync()
	.then((result) => {
		console.log(`Server is running on http://localhost:${PORT}`);
		app.listen(PORT);
	})
	.catch((err) => {
		console.log(err);
	});
