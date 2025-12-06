const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
module.exports.coordinates = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { address } = req.query;
	try {
		const coordinates = await mapService.getAddressCoordinates(address);
		res.status(200).json(coordinates);
	} catch (error) {
		console.error(error);
		res.status(404).json({ message: "Coordinates not found!" });
	}
};

module.exports.distanceAndTime = async (req, res) => {
	const arr = Object.values(req.query);

	if (!req.query)
		return res
			.status(400)
			.json({ message: "Origin and destination required!" });

	try {
		const [originCoords, destinationCoords] = await Promise.all(
			arr.map((loc) => {
				return mapService.getAddressCoordinates(loc);
			})
		);
		const response = await mapService.getDistanceAndTime(
			originCoords,
			destinationCoords
		);

		console.log(response);

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "internal server error!" });
	}
};

module.exports.autoCompleteSuggestions = async (req, res) => {
	const { input } = req.query;
	if (!input || input.trim() === "") {
		return res.json([]);
	}
	try {
		const response = await mapService.getAutoCompleteSuggestions(input);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "internal server error" });
	}
};
