import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		description: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "low",
		},
		status: {
			type: String,
			enum: ["pending", "in progress", "completed"],
			default: "pending",
		},
		dueDate: {
			type: Date,
			required: true,
		},
		assignedTo: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		createdBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		attachments: [
			{
				type: String,
			},
		],
		todoChecklist: [todoSchema],
		progress: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
