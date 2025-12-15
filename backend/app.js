// external inputs
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// internal inputs
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

//
const app = express();
dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', "https://2pxr28ts-5173.inc1.devtunnels.ms"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

app.get("/", (req, res) => {
	res.send("hello world!");
});

// routes
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);

module.exports = app;
