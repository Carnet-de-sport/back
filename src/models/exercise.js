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
  muscles: [{ type: String, enum: MUSCLE_GROUPS }],
  type: { type: String, enum: EXERCISE_TYPES },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const modelName = "Exercise";
// Empêche l’erreur OverwriteModelError :
const Exercise = mongoose.models[modelName]
  ? mongoose.model(modelName)
  : mongoose.model(modelName, ExerciseSchema);

module.exports = {
  Exercise,
  EXERCISE_TYPES,
  MUSCLE_GROUPS,
};
