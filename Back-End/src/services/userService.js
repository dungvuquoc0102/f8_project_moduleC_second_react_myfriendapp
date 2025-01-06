import User from "../models/userSchema.js";

export const createUser = async ({ username, email, password }) => {
  const user = await User.create({
    username,
    email,
    password,
  });
  return user;
};

export const validateUser = async ({ email, password }) => {
  const user = await User.findOne({ email, password });
  return user;
};

export const validateEmailUser = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};
