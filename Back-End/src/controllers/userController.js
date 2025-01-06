import {
  createUser,
  validateEmailUser,
  validateUser,
} from "../services/userService.js";

export const addUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await validateEmailUser({ email });
    if (userExists) throw new Error("User already exists");
    const user = await createUser({
      username: email.split("@")[0],
      password,
      email,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser({ email, password });
    if (!user) throw new Error("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
