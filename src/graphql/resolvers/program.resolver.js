const Program = require("../../models/Program");

// Création d'un programme
const addProgram = async ({ userId, name, description, exercises }) => {
  const program = new Program({ userId, name, description, exercises });
  await program.save();
  return program;
};

const updateProgram = async ({ id, userId, name, description, exercises }) => {
  const program = await Program.findOneAndUpdate(
    { _id: id, userId },
    { name, description, exercises, updatedAt: new Date() },
    { new: true }
  );
  return program;
};

const deleteProgram = async ({ id, userId }) => {
  const program = await Program.findOneAndDelete({ _id: id, userId });
  return program;
};

const getPrograms = async ({ userId }) => {
  return Program.find({ userId });
};

const shareProgram = async ({ programId, userIdToShare }) => {
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
