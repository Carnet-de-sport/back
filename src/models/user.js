const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
  sharedWithMe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
