const { Exercise } = require("../../models/Exercise");

// Création d'un exercice
const addExercise = async ({ userId, name, description, muscles, type }) => {
  const exercise = new Exercise({ userId, name, description, muscles, type });
  await exercise.save();
  return exercise;
};

const updateExercise = async ({
  id,
  userId,
  name,
  description,
  muscles,
  type,
}) => {
  const exercise = await Exercise.findOneAndUpdate(
    { _id: id, userId },
    { name, description, muscles, type, updatedAt: new Date() },
    { new: true }
  );
  return exercise;
};

const deleteExercise = async ({ id, userId }) => {
  const exercise = await Exercise.findOneAndDelete({ _id: id, userId });
  return exercise;
};

const getExercises = async ({ userId }) => {
  return Exercise.find({ userId });
};

const shareExercise = async ({ exerciseId, userIdToShare }) => {
  const exercise = await Exercise.findByIdAndUpdate(
    exerciseId,
    { $addToSet: { sharedWith: userIdToShare }, updatedAt: new Date() },
    { new: true }
  );
  return exercise;
};

module.exports = {
  addExercise,
  updateExercise,
  deleteExercise,
  getExercises,
  shareExercise,
};
