exports.errorResponse = function (res, statusCode, msg) {
	const response = {
		status: false,
		message: msg,
	};

	return res.status(statusCode).json(response);
};

exports.successResponse = function (res, statusCode = 200, data = [], token) {
	const response = {
		status: true,
		message: "success",
		data: {
			result: data,
			token: token,
		},
	};

	return res.status(statusCode).json(response);
};
