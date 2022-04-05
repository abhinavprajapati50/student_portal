const jwt = require("jsonwebtoken");

const JWTSign = (user, options = {}) => {
	const payload = {
		user_id: user.user_id,
		username: user.username,
		email: user.email,
	};

	let secret = process.env.APP_SECRET;

	let signOptions = {
		...options,
	};

	return jwt.sign(payload, secret, signOptions);
};

module.exports = {
	JWTSign,
};
