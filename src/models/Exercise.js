const mongoose = require("mongoose");

const MUSCLE_GROUPS = [
  "Pectoraux",
  "Dos",
  "Épaules",
  "Biceps",
  "Triceps",
  "Jambes",
  "Fessiers",
  "Abdominaux",
  "Mollets",
  "Avant-bras",
  "Cou",
];

const EXERCISE_TYPES = [
  "Force",
  "Cardio",
  "Souplesse",
  "Équilibre",
  "Hypertrophie",
  "Puissance",
];

const ExerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  muscles: [{ type: String, enum: MUSCLE_GROUPS }], // <-- Menu déroulant/array limité aux valeurs
  type: { type: String, enum: EXERCISE_TYPES },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
