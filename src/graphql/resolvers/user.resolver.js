const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const register = async ({ username, email, password }) => {
  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) throw new Error("Username or email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return { id: user._id, username: user.username, email: user.email };
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return { token };
};
const userByUsername = async (_, { username }) => {
  return await User.findOne({ username });
};

module.exports = { register, login, userByUsername };
