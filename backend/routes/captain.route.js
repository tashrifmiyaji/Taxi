// external inputs
const express = require("express");
const { body } = require("express-validator");

// internal inputs
const captainController = require("../controllers/captain.controller");

//
const routes = express.Router();

// register route
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

// login route
routes.post(
	"/login",
	[body("email").isEmail().withMessage("invalid email!")],
	captainController.loginCaptain
);

module.exports = routes;
