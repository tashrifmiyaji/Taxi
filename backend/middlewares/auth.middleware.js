// external inputs
const jwt = require("jsonwebtoken");

// internal inputs
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blackListToken = require("../models/blackListToken.model");
const { isTrustedOrigin } = require("../config/cors");

module.exports.authUser = async (req, res, next) => {
	const authorization = req.headers.authorization;
	const bearerToken = authorization?.startsWith("Bearer ")
		? authorization.slice(7)
		: null;
	const token =
		bearerToken || req.cookies?.token;

	if (!token) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	if (!bearerToken && !isTrustedOrigin(req.headers.origin)) {
		return res.status(403).json({ message: "untrusted origin" });
	}

	const isTokenBlackList = await blackListToken.findOne({ token });
	if (isTokenBlackList) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await userModel.findById(decoded._id);
		req.user = user;
		req.token = token;
		return next();
	} catch (err) {
		return res.status(401).json({ message: "unauthorized!" });
	}
};

module.exports.authCaptain = async (req, res, next) => {
	const authorization = req.headers.authorization;
	const bearerToken = authorization?.startsWith("Bearer ")
		? authorization.slice(7)
		: null;
	const token =
		bearerToken || req.cookies?.["captain-token"];

	if (!token) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	if (!bearerToken && !isTrustedOrigin(req.headers.origin)) {
		return res.status(403).json({ message: "untrusted origin" });
	}

	const isTokenBlackListed = await blackListToken.findOne({ token });

	if (isTokenBlackListed) {
		return res.status(401).json({ message: "unauthorized!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const captain = await captainModel.findById(decoded._id);
		req.captain = captain;
		req.token = token;
		next();
	} catch (err) {
		res.status(401).json({ message: "unauthorized!" });
		throw new Error(err);
	}
};
