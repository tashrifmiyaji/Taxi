// internal inputs
const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
	firstName,
	lastName,
	email,
	password,
	color,
	vehicleNumber,
	capacity,
	vehicleType,
}) => {
	const captain = await captainModel.create({
		fullName: {
			firstName,
			lastName,
		},
		email,
		password,
		vehicle: {
			color,
			vehicleNumber,
			capacity,
			vehicleType,
		},
	});
	return captain;
};

// // Find all captains within a given radius (in kilometers) from a point (latitude, longitude)
// module.exports.getCaptainsInRadius = async (lat, lon, radiusKm = 2) => {
// 	const captains = await captainModel.find({ status: 'active' }).lean();

// 	if (!captains || captains.length === 0) return [];

// 	function deg2rad(deg) {
// 		return deg * (Math.PI / 180);
// 	}

// 	function getDistanceInKm(lat1, lon1, lat2, lon2) {
// 		const R = 6371; // Radius of the earth in km
// 		const dLat = deg2rad(lat2 - lat1);
// 		const dLon = deg2rad(lon2 - lon1);
// 		const a =
// 			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// 			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
// 			Math.sin(dLon / 2) * Math.sin(dLon / 2);
// 		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// 		return R * c; // Distance in km
// 	}

// 	return captains.filter(c => {
// 		if (!c.location || c.location.latitude === undefined || c.location.longitude === undefined) return false;
// 		const dist = getDistanceInKm(lat, lon, c.location.latitude, c.location.longitude);
// 		return dist <= radiusKm;
// 	});
// };
