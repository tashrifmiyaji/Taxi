const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
const { allowedOrigins } = require("./config/cors");

let io;

function initializeSocket(server) {
	io = socketIo(server, {
		cors: {
			origin: allowedOrigins,
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	io.on("connection", (socket) => {
		console.log(`Clint connected, socketId: ${socket.id}`);

		socket.on("join", async (data) => {
			const { userType, userId } = data;
			console.log(data);

			if (userType === "user") {
				await userModel.findByIdAndUpdate(userId, {
					socketId: socket.id,
				});
			} else if (userType === "captain") {
				await captainModel.findByIdAndUpdate(userId, {
					socketId: socket.id,
				});
			}
		});

		socket.on("update-captain-location", async (data) => {
			const { userId, location } = data;

			if (
				!location ||
				typeof location.latitude !== "number" ||
				typeof location.longitude !== "number" ||
				!Number.isFinite(location.latitude) ||
				!Number.isFinite(location.longitude) ||
				Math.abs(location.latitude) > 90 ||
				Math.abs(location.longitude) > 180
			) {
				return socket.emit("error", {
					message: "Invalid location data",
				});
			}

			const { latitude, longitude } = location;

			await captainModel.findByIdAndUpdate(userId, {
				location: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
				socketId: socket.id,
				status: "active",
			});
		});

		socket.on("disconnect", async () => {
			await captainModel.updateOne(
				{ socketId: socket.id },
				{ socketId: null, status: "inactive" }
			);
			console.log(`Clint disconnected! socketId: ${socket.id}`);
		});
	});
}

function sentMessageToSocketId(socketId, eventNameAndData) {
	if (io?.sockets.sockets.get(socketId)) {
		io.to(socketId).emit(eventNameAndData.eventName, eventNameAndData.data);
	} else {
		console.log("Socket.io not initialized!");
	}
}

module.exports = { initializeSocket, sentMessageToSocketId };
