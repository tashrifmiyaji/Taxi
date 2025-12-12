const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
	if (!pickup || !destination) {
		throw new Error("Pickup and Destination are Required!");
	}

	const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

	const destinationCoordinates = await mapService.getAddressCoordinates(
		destination
	);

	const distanceAndTime = await mapService.getDistanceAndTime(
		pickupCoordinates,
		destinationCoordinates
	);

	const baseFare = {
		car: 50,
		bike: 20,
	};

	const perKmRate = {
		car: 15,
		bike: 8,
	};

	const perMinuteRate = {
		car: 3,
		bike: 1.5,
	};

	const fare = {
		car: Math.round(
			baseFare.car +
				(distanceAndTime.distance / 1000) * perKmRate.car +
				(distanceAndTime.duration / 60) * perMinuteRate.car
		),
		bike: Math.round(
			baseFare.bike +
				(distanceAndTime.distance / 1000) * perKmRate.bike +
				(distanceAndTime.duration / 60) * perMinuteRate.bike
		),
	};

	return fare;
}

module.exports.getFare = getFare;

function otp() {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	const code = (array[0] % 900000) + 100000;
	return code;
}

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
	if (!user || !pickup || !destination || !vehicleType) {
		throw new Error("All fields are required");
	}
	const pickupName = pickup.split(",")[0];
	const destinationName = destination.split(",")[0];

	const fare = await getFare(pickupName, destinationName);

	const ride = rideModel.create({
		user,
		pickup,
		destination,
		otp: otp(),
		fare: fare[vehicleType],
	});

	return ride;
};
