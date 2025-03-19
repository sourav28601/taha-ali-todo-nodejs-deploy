import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a JWT token
    const userId = newUser._id.toString();
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    newUser.token = token;
    await newUser.save();
    res.json({
      message: "Registration done successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Invalid EmailId" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    res.status(201).json({
      message: "LogIn Successfully !!!",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
