import axios from "axios";

// base url
const baseUrl = import.meta.env.VITE_BASE_URL;

// user register
export const userRegister = (newUser) => {
	return axios.post(`${baseUrl}/user/register`, newUser);
};

// user login
export const userLogin = (loginUserData) => {
	return axios.post(`${baseUrl}/user/login`, loginUserData);
};

// user logout
export const userLogout = (token) => {
	return axios.get(`${baseUrl}/user/logout`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// user profile
export const userProfile = async (token) => {
	return axios.get(`${baseUrl}/user/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
