import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// load essential data from .ENV file
dotenv.config();

// connect mongodb database
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log(`database is connected. `);
	})
	.catch((err) => {
		console.log(err);
	});

const app = express();

const PORT = process.env.PORT || 3000;

// middleware to handle cors
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5174",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

// middleware to handle JSON in req body
app.use(express.json());

app.get("/", (req, res) => {
	res.send("This is simple App");
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
