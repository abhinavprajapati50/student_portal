const dbconfig = require("../config/db.config");
const { successResponse, errorResponse } = require("../helper/ApiResponse");
const userIdentity = require("../model/userIdentity");
const bcrypt = require("bcrypt");
const { JWTSign } = require("../helper/JwtTokenGenerator");

//registration logic
exports.createUser = async (req, res) => {
	try {
		let { first_name, last_name, email, password } = req.body;

		// check email is already register or not
		const emailMatch = await userIdentity.findOne({
			where: { email: email },
		});
		if (emailMatch) {
			return errorResponse(res, 200, "email id is already registered");
		} else {
			password = await bcrypt.hash(password, 10);
			// register user
			const userData = await userIdentity.create({
				first_name,
				last_name,
				email,
				password: password,
			});

			//jwt token generate
			const token = JWTSign({
				user_id: userData.id,
				username: userData.first_name,
				email: userData.email,
			});

			return successResponse(res, 200, userData, token);
		}
	} catch (error) {
		return errorResponse(res, 200, error.message);
	}
};

//login logic
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const data = await userIdentity.findOne({
			where: { email: email },
		});
		if (!data) {
			return errorResponse(res, 200, "Invalid credentials !!");
		}
		if (data) {
			bcrypt.compare(password, data.password, async (err, result) => {
				if (!result) {
					return errorResponse(res, 200, "Invalid password !!");
				} else {
					const token = JWTSign({
						user_id: data.id,
						username: data.first_name,
						email: data.email,
					});

					let responseData = {
						id: data.id,
						first_name: data.first_name,
						last_name: data.last_name,
						email: data.email,
					};
					return successResponse(res, 200, responseData, token);
				}
			});
		}
	} catch (error) {
		return errorResponse(res, 200, error.message);
	}
};
