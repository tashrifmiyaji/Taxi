import apiClient from "./apiClient";

// user register
export const userRegister = (newUser) => {
	return apiClient.post("/user/register", newUser);
};

// user login
export const userLogin = (loginUserData) => {
	return apiClient.post("/user/login", loginUserData);
};

// user logout
export const userLogout = (token) => {
	return apiClient.get("/user/logout", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// user profile
export const userProfile = async (token) => {
	return apiClient.get("/user/profile", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
