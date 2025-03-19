import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const queryObject = {
    userId: req.user.userId,
  };

  if (newPassword !== confirmNewPassword) {
    return res.status(400).send("New passwords do not match.");
  }
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Old password is incorrect.");
    }

    // Hash new password and update
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();
    res.send("Password successfully updated.");
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
};
