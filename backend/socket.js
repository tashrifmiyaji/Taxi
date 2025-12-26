const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
	io = socketIo(server, {
		cors: {
			origin: "*",
			method: ["GET", "POST"],
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
				typeof location.longitude !== "number"
			) {
				return socket.emit("error", {
					message: "invalid location data!",
				});
			}

			const { latitude, longitude } = location;

			await captainModel.findByIdAndUpdate(userId, {
				location: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
			});
		});

		socket.on("disconnect", () => {
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
