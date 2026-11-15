const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

const resolveCoordinates = async (location) => {
	const parts = location.split(",");
	if (
		parts.length === 2 &&
		parts.every((part) => part.trim() !== "" && Number.isFinite(Number(part)))
	) {
		const [lat, lon] = parts.map(Number);
		if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
			throw new RangeError("Coordinates must be valid latitude,longitude values");
		}
		return { lat, lon };
	}

	return mapService.getAddressCoordinates(location);
};

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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { origin, destination } = req.query;
	if (!origin || !destination) {
		return res
			.status(400)
			.json({ message: "Origin and destination required!" });
	}

	try {
		const [originCoords, destinationCoords] = await Promise.all([
			resolveCoordinates(origin),
			resolveCoordinates(destination),
		]);
		const response = await mapService.getDistanceAndTime(
			originCoords,
			destinationCoords
		);

		res.status(200).json(response);
	} catch (error) {
		if (error instanceof RangeError) {
			return res.status(400).json({ message: error.message });
		}
		console.error(error);
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
		console.error(error);
		res.status(500).json({ message: "internal server error" });
	}
};
