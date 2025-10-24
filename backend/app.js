// external inputs
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// internal inputs
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.route");

//
const app = express();
dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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

module.exports = app;
