import axios from "axios";

// base url
const baseUrl = import.meta.env.VITE_BASE_URL;

// sighup captain
export const signupCaptain = (newCaptain) => {
	return axios.post(`${baseUrl}/captain/register`, newCaptain);
};
// login captain
export const loginCaptain = (loginUserData) => {
	return axios.post(`${baseUrl}/captain/login`, loginUserData);
};

// captainProfile
export const captainProfile = (token) => {
	return axios.get(`${baseUrl}/captain/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// captain logout
export const captainLogout = (token) => {
	return axios.get(`${baseUrl}/captain/logout`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
