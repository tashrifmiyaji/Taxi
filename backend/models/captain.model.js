// external imports
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
	fullName: {
		firstName: {
			type: String,
			required: true,
			minlength: [3, "first name must be at least 3 characters long"],
		},
		lastName: {
			type: String,
			minlength: [3, "last name must be at least 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	socketId: {
		type: String,
	},
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "inactive",
	},
	vehicle: {
		color: {
			type: String,
			required: true,
		},
		vehicleNumber: {
			type: String,
			required: true,
			minlength: [
				4,
				"numberplate number must be at least 4 characters long",
			],
		},
		capacity: {
			type: Number,
			required: true,
			min: [1, "capacity must be at least 1"],
		},
		vehicleType: {
			type: String,
			required: true,
			enum: ["car", "bike"],
		},
	},
	// ✅ GeoJSON Location
	location: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
		},
		coordinates: {
			type: [Number], // [longitude, latitude]
			required: true,
		},
	},
});

// ✅ 2dsphere index (MUST)
captainSchema.index({ location: "2dsphere" });

// ---------- methods ----------
captainSchema.methods.generateCaptainToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

captainSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("captain", captainSchema);
