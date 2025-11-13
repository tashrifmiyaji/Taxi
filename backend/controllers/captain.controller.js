// external inputs
const { validationResult } = require("express-validator");

// internal inputs
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");

// register
module.exports.registerCaptain = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return res.status(400).json({ error: errors.array() });
	}

	const { fullName, email, password, vehicle } = req.body;

	if (
		!fullName.firstName &&
		!email &&
		!password &&
		!vehicle.color &&
		!vehicle.vehicleNumber &&
		!vehicle.capacity &&
		!vehicle.vehicleType
	) {
		return res
			.status(400)
			.json({ message: "Fill all the required fields!" });
	}

	const isCaptainExist = await captainModel.findOne({ email });

	if (isCaptainExist) {
		return res.status(409).json("captain already exist!");
	}

	const hashedPassword = await captainModel.hashPassword(password);

	const captain = await captainService.createCaptain({
		firstName: fullName.firstName,
		lastName: fullName.lastName,
		email,
		password: hashedPassword,
		color: vehicle.color,
		vehicleNumber: vehicle.vehicleNumber,
		capacity: vehicle.capacity,
		vehicleType: vehicle.vehicleType,
	});
	const captainObj = captain.toObject();
	delete captainObj.password;

	const token = await captain.generateCaptainToken();
	res.cookie("captain-token", token);

	res.status(201).json({ captain: captainObj, token });
};

// login
module.exports.loginCaptain = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty) {
		return res.status(400).json({ error: errors.array() });
	}

	const { email, password } = req.body;

	if (!email && !password) {
		return res
			.status(400)
			.json({ message: "fill all the required fields!" });
	}

	const captain = await captainModel.findOne({ email }).select("+password");

	if (!captain) {
		return res.status(401).json({ message: "invalid credential!" });
	}

	const isCorrectPassword = await captain.comparePassword(password);

	if (!isCorrectPassword) {
		return res.status(401).json({ message: "invalid credential!" });
	}

	const captainObj = captain.toObject();
	delete captainObj.password;

	const token = await captain.generateCaptainToken();
	res.cookie("captain-token", token);

	res.status(200).json({ captain: captainObj, token });
};

// profile
module.exports.captainProfile = (req, res) => {
	res.status(200).json(req.captain);
};

// logout
module.exports.captainLogout = async (req, res) => {
	const token = req.token;
	await blackListTokenModel.create({ token });
	res.clearCookie("captain-token");
	res.status(200).json({ message: "captain logout successfully." });
};
