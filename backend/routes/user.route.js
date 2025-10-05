// external inputs
const express = require("express");
const { body } = require("express-validator");

// internal inputs
const userController = require("../controllers/user.controller");
const userModel = require("../models/user.model");

//
const routes = express.Router();

// user registration
routes.post(
	"/register",
	[
		body("email").isEmail().withMessage("invalid email!"),
		body("fullName.firstName")
			.isLength({ min: 3 })
			.withMessage("name must be at least 3 characters long"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("password must be at least 6 characters long"),
	],
	userController.registerUser
);

// user login
routes.post(
	"/login",
	[body("email").isEmail().withMessage("invalid email!")],
	userController.loginUser
);

module.exports = routes;
