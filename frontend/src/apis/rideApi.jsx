import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * Get fare for pickup and destination. Accepts either display strings or suggestion objects.
 * @param {object|string} pickup - suggestion object or display string
 * @param {object|string} destination - suggestion object or display string
 * @param {string} [token] - optional auth token; falls back to localStorage
 */
export const getSuggestions = (input, token) => {
	return axios.get(`${baseUrl}/maps/suggestions`, {
		params: { input },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getFare = (pickup, destination) => {
	const token = localStorage.getItem("token") || "";

	const pickupName = pickup.split(",")[0];
	const destinationName = destination.split(",")[0];

	return axios.get(`${baseUrl}/ride/get-fare`, {
		params: { pickup: pickupName, destination: destinationName },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createRide = (rideInfo) => {
    const token = localStorage.getItem("token") || "";
    return axios.post(`${baseUrl}/ride/create`, rideInfo, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export default getSuggestions;
