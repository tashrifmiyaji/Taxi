const isProduction = process.env.NODE_ENV === "production";

const authCookieOptions = {
	httpOnly: true,
	secure: isProduction,
	sameSite: isProduction ? "none" : "lax",
	path: "/",
};

module.exports.setAuthCookie = (res, name, token) =>
	res.cookie(name, token, {
		...authCookieOptions,
		maxAge: 24 * 60 * 60 * 1000,
	});

module.exports.clearAuthCookie = (res, name) =>
	res.clearCookie(name, authCookieOptions);
