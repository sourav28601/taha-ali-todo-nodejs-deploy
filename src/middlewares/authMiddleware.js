import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authentication token missing or invalid" });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async function (err) {
    if (err) {
      return res;
    } else {
      req.user = await User.findOne({ token: token });

      const userId = req.user._id.toString();

      req.user = { userId };
    }
    next();
  });
};
