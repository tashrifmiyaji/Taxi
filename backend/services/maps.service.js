const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
	const apiKey = process.env.GOOGLE_MAP_API_KEY;
	
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;

	try {
		const res = await axios.get(url);

		const location = res.data[0];

		return {
			lon: Number(location.lon),
			lat: Number(location.lat),
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
	
	const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?overview=false`;
	try {
		const res = await axios.get(url);
	
		const route = res.data.routes[0];
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
		const [photonRes, meteRes] = await Promise.all([
			axios.get(urlPhoton),
			axios.get(urlOpenMeteo),
		]);

		const photonData =
			photonRes.data.features?.map((item) => ({
				name: item.properties.name,
				city: item.properties.city,
				country: item.properties.country,
				lat: item.geometry.coordinates[1],
				lon: item.geometry.coordinates[0],
			})) || [];

		const meteData =
			meteRes.data.results?.map((item) => ({
				name: item.name,
				city: item.admin3 || item.admin2 || item.admin1,
				country: item.country,
				lat: item.latitude,
				lon: item.longitude,
			})) || [];

		// merge + remove duplicates by name+city
		const all = [...photonData, ...meteData];

		const unique = all.filter(
			(item, index, self) =>
				index ===
				self.findIndex(
					(x) => x.name === item.name && x.city === item.city
				)
		);
		return unique;
	} catch (error) {
		console.log(error);
		throw Error(error);
	}
};
