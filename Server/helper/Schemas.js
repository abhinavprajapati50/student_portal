const Joi = require("joi");

const Schemas = {
	userIdentity: Joi.object().keys({
		first_name: Joi.string().required().messages({
			"string.base": "First Name should be String",
			"string.empty": "First Name is required",
			"any.required": "First Name is required",
		}),
		last_name: Joi.string().required().messages({
			"string.base": "Last Name should be String",
			"string.empty": "Last Name is required",
			"any.required": "Last Name is required",
		}),
		email: Joi.string().required().email().messages({
			"string.email.base": "email should be String",
			"string.email.empty": "email is required",
			"string.email.required": "email is required",
			"string.email.message": "email must be a valid email",
		}),
		password: Joi.string().min(8).required().messages({
			"string.base": "password should be minimun 8 character",
			"string.empty": "password is required",
			"any.required": "password is required",
		}),
	}),
	loginuser: Joi.object().keys({
		email: Joi.string().required().email().messages({
			"string.base": "email should be String",
			"string.empty": "email is required",
			"string.required": "email is required",
			"string.message": "email must be a valid email",
		}),
		password: Joi.string().min(8).required().messages({
			"string.base": "password should be minimun 8 character",
			"string.empty": "password is required",
			"any.required": "password is required",
		}),
	}),
};

module.exports = Schemas;
