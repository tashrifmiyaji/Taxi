// internal inputs
const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
	firstName,
	lastName,
	email,
	password,
	color,
	vehicleNumber,
	capacity,
	vehicleType,
}) => {
	const captain = await captainModel.create({
		fullName: {
			firstName,
			lastName,
		},
		email,
		password,
		vehicle: {
			color,
			vehicleNumber,
			capacity,
			vehicleType,
		},
	});
	return captain;
};
