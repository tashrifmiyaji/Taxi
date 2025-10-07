// external inputs
const { validationResult } = require("express-validator");

// internal inputs
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blackListTokenModel = require("../models/blackListToken.model");

// user registration
module.exports.registerUser = async (req, res) => {
	const errors = validationResult(req);
	console.log(errors.array());

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}

	const { fullName, email, password } = req.body;

	const hashedPassword = await userModel.hashPassword(password);

	if (!fullName.firstName || !email || !password) {
		throw new Error("Fill all the required fields");
	}

	try {
		const user = await userService.createUser({
			firstName: fullName.firstName,
			lastName: fullName.lastName,
			email,
			password: hashedPassword,
		});

		const userObj = user.toObject();
		delete userObj.password;

		const token = await user.generateAuthToken();
		res.cookie("token", token);

		res.status(201).json({ user: userObj, token });
	} catch (err) {
		if (err.code === 11000 && err.keyPattern.email) {
			res.status(409).json("user already exist!");
		}
	}
};

// user login
module.exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email && !password) {
		throw new Error("fill all the required fields");
	}

	const user = await userModel.findOne({ email }).select("+password");

	if (!user) {
		res.status(401).json({ message: "invalid credential!" });
		return;
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		res.status(401).json({ message: "invalid credential!" });
		return;
	}

	const token = user.generateAuthToken();

	res.cookie("token", token);
	const userObj = user.toObject();
	delete userObj.password;

	res.status(200).json({ user: userObj, token });
};

module.exports.userProfile = async (req, res) => {
	res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
	const token =
		req.cookies?.token || req.headers.authorization?.split(" ")[1];
	await blackListTokenModel.create({ token });
	res.clearCookie("token");
	res.status(200).json({ message: "User Logout" });
};
