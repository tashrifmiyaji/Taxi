// external inputs
const jwt = require("jsonwebtoken");

// internal inputs
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blackListToken = require("../models/blackListToken.model");

module.exports.authUser = async (req, res, next) => {
	const token =
		req.cookies?.token || req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	const isTokenBlackList = await blackListToken.findOne({ token });
	if (isTokenBlackList) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await userModel.findById(decoded._id);
		req.user = user;
		return next();
	} catch (err) {
		return res.status(401).json({ message: "unauthorized!" });
	}
};

module.exports.authCaptain = async (req, res, next) => {
	const token =
		req.cookies?.["captain-token"] ||
		req.headers?.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	const isTokenBlackListed = await blackListToken.findOne({ token });

	if (isTokenBlackListed) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const captain = await captainModel.findById(decoded._id);
		req.captain = captain;
		next();
	} catch (err) {
		res.status(401).json({ message: "unauthorized!" });
		throw new Error(err);
	}
};
