const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "user",
		required: true,
	},
	captain: {
		type: mongoose.Schema.ObjectId,
		ref: "captain",
	},
	pickup: {
		type: String,
		required: true,
	},
	destination: {
		type: String,
		required: true,
	},
	fare: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "accepted", "ongoing", "completed", "cancel"],
		default: "pending",
	},

	distance: {
		type: Number,
	},

	duration: {
		type: Number,
	},

	paymentId: {
		type: String,
	},
	orderId: {
		type: String,
	},
	signature: {
		type: String,
	},
	otp: {
		type: String,
		selected: false,
		required: true,
	},
});

const model = mongoose.model("ride", rideSchema);
module.exports = model;
