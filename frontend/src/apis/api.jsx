import axios from "axios";

// base url
const baseUrl = import.meta.env.VITE_BASE_URL;

// user register
export const userRegister = async (newUser) => {
	try {
		return await axios.post(`${baseUrl}/user/register`, newUser);
	} catch (error) {
		console.log(error);
	}
};

// user login
export const userLogin = async (loginUserData) => {
	try {
		return await axios.post(`${baseUrl}/user/login`, loginUserData);
	} catch (error) {
		console.log(error);
	}
};

// user logout
export const userLogout = async (token) => {
	try {
		return await axios.get(`${baseUrl}/user/logout`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		throw error;
	}
};
