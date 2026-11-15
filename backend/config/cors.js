const developmentOrigins = [
	"http://localhost:5173",
	"http://127.0.0.1:5173",
];

const normalizeOrigin = (origin, variableName) => {
	try {
		const parsed = new URL(origin);
		if (!["http:", "https:"].includes(parsed.protocol)) {
			throw new Error();
		}
		return parsed.origin;
	} catch {
		throw new Error(`${variableName} must contain valid HTTP(S) origins`);
	}
};

const configuredOrigins = [
	process.env.FRONTEND_URL,
	...(process.env.CORS_ORIGINS || "")
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean),
]
	.filter(Boolean)
	.map((origin) => normalizeOrigin(origin, "FRONTEND_URL/CORS_ORIGINS"));

const allowedOrigins = new Set(configuredOrigins);

if (process.env.NODE_ENV !== "production") {
	developmentOrigins.forEach((origin) => allowedOrigins.add(origin));
}

if (process.env.NODE_ENV === "production" && allowedOrigins.size === 0) {
	throw new Error(
		"Set FRONTEND_URL or CORS_ORIGINS before starting the production server"
	);
}

const isTrustedOrigin = (origin) => Boolean(origin && allowedOrigins.has(origin));

const isAllowedOrigin = (origin, callback) => {
	callback(null, !origin || isTrustedOrigin(origin));
};

module.exports = {
	allowedOrigins: [...allowedOrigins],
	isAllowedOrigin,
	isTrustedOrigin,
};
