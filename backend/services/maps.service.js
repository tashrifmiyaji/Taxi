const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
	try {
		const res = await axios.get(
			"https://nominatim.openstreetmap.org/search",
			{
				params: {
					format: "json",
					q: address,
				},
				headers: {
					"User-Agent":
						"TaxiApp/1.0 (contact: sadiyaislam1111@gmail.com)",
					"Accept-Language": "en",
				},
			}
		);

		const location = res.data[0];
		if (!location) {
			throw new Error(`No coordinates found for address: ${address}`);
		}

		const lat = Number(location.lat);
		const lon = Number(location.lon);
		if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
			throw new Error("Geocoding provider returned invalid coordinates");
		}

		return {
			lon,
			lat,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports.getDistanceAndTime = async (originCoords, destinationCoords) => {
	if (!originCoords || !destinationCoords) {
		throw new Error("Origin and Destination are required!");
	}
	for (const coords of [originCoords, destinationCoords]) {
		if (
			!Number.isFinite(coords.lat) ||
			!Number.isFinite(coords.lon) ||
			Math.abs(coords.lat) > 90 ||
			Math.abs(coords.lon) > 180
		) {
			throw new Error("Origin and destination coordinates are invalid");
		}
	}

	const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?overview=false`;
	try {
		const res = await axios.get(url);

		const route = res.data.routes?.[0];
		if (!route) {
			throw new Error("No driving route found");
		}
		return {
			distance: route.distance, // meters
			duration: route.duration, // seconds
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports.getAutoCompleteSuggestions = async (input) => {
	const urlPhoton = `https://photon.komoot.io/api/?q=${input}`;
	const urlOpenMeteo = `https://geocoding-api.open-meteo.com/v1/search?name=${input}`;

	try {
		const [photonRes, meteRes] = await Promise.allSettled([
			axios.get(urlPhoton),
			axios.get(urlOpenMeteo),
		]);

		const photonData =
			photonRes.status === "fulfilled"
				? photonRes.value.data.features?.map((item) => ({
						name: item.properties.name,
						city: item.properties.city,
						country: item.properties.country,
						lat: item.geometry.coordinates[1],
						lon: item.geometry.coordinates[0],
				  })) || []
				: [];

		const meteData =
			meteRes.status === "fulfilled"
				? meteRes.value.data.results?.map((item) => ({
						name: item.name,
						city: item.admin3 || item.admin2 || item.admin1,
						country: item.country,
						lat: item.latitude,
						lon: item.longitude,
				  })) || []
				: [];

		const all = [...photonData, ...meteData];

		const unique = all.filter(
			(item, index, self) =>
				index ===
				self.findIndex(
					(x) => x.name === item.name && x.city === item.city
				)
		);

		return unique;
	} catch (err) {
		console.log(err);
		throw Error("API error");
	}
};

module.exports.getCaptainInTheRadius = async (latitude, longitude, radius = 2) => {
	if (
		!Number.isFinite(latitude) ||
		!Number.isFinite(longitude) ||
		Math.abs(latitude) > 90 ||
		Math.abs(longitude) > 180 ||
		!Number.isFinite(radius) ||
		radius <= 0
	) {
		throw new Error("Invalid location or search radius");
	}

	const captains = await captainModel.find({
		status: "active",
		location: {
			$geoWithin: {
				$centerSphere: [[longitude, latitude], radius / 6371],
			},
		},
	});

	return captains;
};
