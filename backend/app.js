// external inputs
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// internal inputs
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.route");

//
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.get("/", (req, res) => {
	res.send("hello world!");
});

app.use("/user", userRoutes);

module.exports = app;
