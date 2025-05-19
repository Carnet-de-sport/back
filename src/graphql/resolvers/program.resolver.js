const { Program } = require("../../models/Program");
const User = require("../../models/user");

const addProgram = async ({ name, description, exercises }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  const program = new Program({
    userId: context.user.userId,
    name,
    description,
    exercises,
  });
  await program.save();
  return program;
};

const updateProgram = async ({ id, name, description, exercises }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  const program = await Program.findOneAndUpdate(
    { _id: id, userId: context.user.userId },
    { name, description, exercises, updatedAt: new Date() },
    { new: true }
  );
  return program;
};

const deleteProgram = async ({ id }, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  const program = await Program.findOneAndDelete({
    _id: id,
    userId: context.user.userId,
  });
  return program;
};

const getPrograms = async (_, context) => {
  if (!context.user) throw new Error("Non autorisé !");
  return Program.find({
    $or: [{ userId: context.user.userId }, { sharedWith: context.user.userId }],
  });
};

const shareProgram = async ({ programId, usernameToShare }, context) => {
  if (!context.user) throw new Error("Non autorisé !");

  const userToShare = await User.findOne({ username: usernameToShare });
  if (!userToShare) throw new Error("User not found");
  const program = await Program.findByIdAndUpdate(
    programId,
    { $addToSet: { sharedWith: userIdToShare }, updatedAt: new Date() },
    { new: true }
  );
  return program;
};

module.exports = {
  addProgram,
  updateProgram,
  deleteProgram,
  getPrograms,
  shareProgram,
};
