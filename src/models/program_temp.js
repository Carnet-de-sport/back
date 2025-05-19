const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  exercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      reps: Number,
      sets: Number,
      weight: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const modelName = "Program";
const Program =
  mongoose.models[modelName] || mongoose.model(modelName, ProgramSchema);

module.exports = { Program };
