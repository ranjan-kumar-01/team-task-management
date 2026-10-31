import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

	if (
		!name ||
		!email ||
		!password ||
		name === "" ||
		email === "" ||
		password === ""
	) {
		return res.status(400).json({ message: "all fields are required" });
	}

	// check if user already exists
	const isUserExist = await User.findOne({ email });
	if (isUserExist) {
		return res.status(400).json({
			success: false,
			message: "user already exists",
		});
	}

	// check user role
	let role = "user";
	if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
		role = "admin";
	}

	const hashedPassword = bcrypt.hashSync(password, 10);

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
		profileImageUrl,
		role,
	});

	try {
		await newUser.save();
		res.json({ message: "signup successful" });
	} catch (error) {
		console.log(error.message);
	}
};

export const login = async (req, res) => {};
