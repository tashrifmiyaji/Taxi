const rideService = require("../services/ride.service");
const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sentMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { pickup, destination, vehicleType } = req.body;

	try {
		const ride = await rideService.createRide(
			req.user._id,
			pickup,
			destination,
			vehicleType
		);
		res.status(201).json(ride);

		//
		try {
			const pickupCoordinates = await mapsService.getAddressCoordinates(
				pickup
			);
			const destinationCoordinates =
				await mapsService.getAddressCoordinates(destination);
			const distanceAndTime = await mapsService.getDistanceAndTime(
				pickupCoordinates,
				destinationCoordinates
			);

			const distance = distanceAndTime.distance; // meter
			const duration = distanceAndTime.duration; // second

			const captainInRadius = await mapsService.getCaptainInTheRadius(
				pickupCoordinates.lat,
				pickupCoordinates.lon,
				2
			);

			const rideWithUser = await rideModel
				.findOneAndUpdate(
					{ _id: ride._id },
					{ distance, duration },
					{ new: true }
				)
				.populate("user");
			//
			rideWithUser.otp = "";

			captainInRadius.map((captain) => {
				sentMessageToSocketId(captain.socketId, {
					eventName: "new-ride",
					data: rideWithUser,
				});
			});
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		return res.status(400).json({ message: error });
	}
};

module.exports.getFare = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { pickup, destination } = req.query;

	try {
		const fare = await rideService.getFare(pickup, destination);
		return res.status(200).json(fare);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.confirmRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { rideId } = req.body;

	try {
		const ride = await rideService.confirmRide({
			rideId,
			captain: req.captain,
		});

		sentMessageToSocketId(ride.user.socketId, {
			eventName: "ride-confirmed",
			data: ride,
		});

		return res.status(200).json(ride);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err.message });
	}
};

module.exports.startRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { rideId, otp } = req.query;

	try {
		const ride = await rideService.startRide({
			rideId,
			otp,
			captain: req.captain,
		});

		sentMessageToSocketId(ride.user.socketId, {
			eventName: "ride-started",
			data: ride,
		});

		return res.status(200).json(ride);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.endRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { rideId } = req.body;
	try {
		const ride = await rideService.endRide({
			rideId,
			captain: req.captain,
		});
		sentMessageToSocketId(ride?.user.socketId, {
			eventName: "ride-ended",
			data: ride,
		});

		res.status(200).json(ride);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "internal server error!" });
	}
};
