// external inputs
const express = require("express");
const { body } = require("express-validator");

// internal inputs
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//
const routes = express.Router();

// captain register route
routes.post(
	"/register",
	[
		body("email").isEmail().withMessage("Invalid Email"),
		body("fullName.firstName")
			.isLength({ min: 3 })
			.withMessage("First name must be at least 3 character long!"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("password must be at least 6 character long!"),
		body("vehicle.vehicleNumber")
			.isLength({ min: 4 })
			.withMessage("vehicle Number must be at least 4 character long!"),
		body("vehicle.capacity")
			.isLength({ min: 1 })
			.withMessage("capacity must be at least 1"),
		body("vehicle.vehicleType")
			.isIn(["car", "bike"])
			.withMessage("Vehicle type must be car or bike!"),
	],
	captainController.registerCaptain
);

// captain login route
routes.post(
	"/login",
	[body("email").isEmail().withMessage("invalid email!")],
	captainController.loginCaptain
);

// captain profile route
routes.get(
	"/profile",
	authMiddleware.authCaptain,
	captainController.captainProfile
);

// captain logout
routes.get(
	"/logout",
	authMiddleware.authCaptain,
	captainController.captainLogout
);

module.exports = routes;
