const express = require("express");
const { query } = require("express-validator");
const router = express.Router();
const authController = require("../middlewares/auth.middleware");
const mapController = require("../controllers/maps.controller");

router.get(
	"/coordinates",
	query("address").isString().isLength({ min: 3 }),
	authController.authUser,
	mapController.coordinates
);

router.get(
	"/distance-time",
	authController.authUser,
	mapController.distanceAndTime
);

router.get(
	"/suggestions",
	authController.authUser,
	mapController.autoCompleteSuggestions
);

module.exports = router;
