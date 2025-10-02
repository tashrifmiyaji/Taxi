// external inputs
const express = require("express");
const { body } = require("express-validator");

// internal inputs
const userController = require("../controllers/user.controller");

//
const routes = express.Router();

routes.post(
	"/register",
	[
		body("email").isEmail().withMessage("invalid email"),
		body("fullName.firstName")
			.isLength({ min: 3 })
			.withMessage("name must be at least 3 characters long"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("password must be at least 6 characters long"),
	],
	userController.registerUser
);

module.exports = routes;
