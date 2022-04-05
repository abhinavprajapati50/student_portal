const { errorResponse } = require("./ApiResponse");

exports.Validator = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);

		if (error !== undefined) {
			return errorResponse(res, 200, error.details[0].message);
		}
		return next();
	};
};
