import apiClient from "./apiClient";

// sighup captain
export const signupCaptain = (newCaptain) => {
	return apiClient.post("/captain/register", newCaptain);
};
// login captain
export const loginCaptain = (loginUserData) => {
	return apiClient.post("/captain/login", loginUserData);
};

// captainProfile
export const captainProfile = (token) => {
	return apiClient.get("/captain/profile", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// captain logout
export const captainLogout = (token) => {
	return apiClient.get("/captain/logout", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
