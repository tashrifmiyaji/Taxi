// external inputs
const http = require("http");

// internal inputs
const app = require("./app");

//
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}/`);
});
