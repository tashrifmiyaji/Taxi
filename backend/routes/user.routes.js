// external inputs
const express = require("express");
const { body } = require("express-validator");

// internal inputs
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

// user profile
routes.get("/profile", authMiddleware.authUser, userController.userProfile);

// user Logout
routes.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = routes;
