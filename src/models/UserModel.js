import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: String,
  password: String,
  token: { type: String },
});

export default mongoose.model("User", UserSchema);
