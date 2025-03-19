import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDb = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Mongoose connection error --> ${err}`));
};

export default connectDb;
