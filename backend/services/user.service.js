// internal inputs
const userModel = require("../models/user.model");

module.exports.createUser = async ({
	firstName,
	lastName,
	email,
	password,
}) => {
	return await userModel.create({
		fullName: {
			firstName,
			lastName,
		},
		email,
		password,
	});
};
