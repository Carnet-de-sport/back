const { Exercise } = require("../../models/Exercise");

const addExercise = async ({ name, description, muscles, type }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  const exercise = new Exercise({
    userId: context.user.userId,
    name,
    description,
    muscles,
    type,
  });
  await exercise.save();
  return exercise;
};

const updateExercise = async (
  { id, name, description, muscles, type },
  context
) => {
  if (!context.user) throw new Error("Non autorisé !");
  const exercise = await Exercise.findOneAndUpdate(
    { _id: id, userId: context.user.userId },
    { name, description, muscles, type, updatedAt: new Date() },
    { new: true }
  );
  return exercise;
};

const deleteExercise = async ({ id }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  const exercise = await Exercise.findOneAndDelete({
    _id: id,
    userId: context.user.userId,
  });
  return exercise;
};

const getExercises = async (_, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  return Exercise.find({
    $or: [{ userId: context.user.userId }, { sharedWith: context.user.userId }],
  });
};

const shareExercise = async ({ exerciseId, userIdToShare }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
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
