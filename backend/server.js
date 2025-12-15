// external inputs
const http = require("http");

// internal inputs
const app = require("./app");
const { initializeSocket } = require("./socket");

//
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
initializeSocket(server)

server.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}/`);
});
