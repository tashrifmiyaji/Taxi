import apiClient from "./apiClient";

/**
 * Get fare for pickup and destination. Accepts either display strings or suggestion objects.
 * @param {object|string} pickup - suggestion object or display string
 * @param {object|string} destination - suggestion object or display string
 * @param {string} [token] - optional auth token; falls back to localStorage
 */
export const getSuggestions = (input, token) => {
	return apiClient.get("/maps/suggestions", {
		params: { input },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getFare = (pickup, destination) => {
	const token = localStorage.getItem("token") || "";

	return apiClient.get("/ride/get-fare", {
		params: { pickup, destination },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createRide = (rideInfo) => {
	const token = localStorage.getItem("token") || "";
	return apiClient.post("/ride/create", rideInfo, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postCaptainConfirmRide = (rideId) => {
	const token = localStorage.getItem("token") || "";
	return apiClient.post(
		"/ride/confirm",
		{ rideId },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const getStartedRide = (rideId, otp) => {
	const token = localStorage.getItem("token") || "";
	return apiClient.get("/ride/ride-started", {
		params: { rideId, otp },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const rideEnd = (rideId) => {
	const token = localStorage.getItem("token");
	return apiClient.post(
		"/ride/ride-end",
		{ rideId },
		{ headers: { authorization: `Bearer ${token}` } }
	);
};
export default getSuggestions;
