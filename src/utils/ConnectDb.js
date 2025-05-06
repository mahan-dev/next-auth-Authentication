import mongoose from "mongoose";

const connectDb = async () => {
  const BaseUrl = process.env.MONGO_URI;
  mongoose.set("strictQuery", false);
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(BaseUrl);

    console.log("connect to database");
  } catch {
    console.log("Error connecting to database");
  }
};
export default connectDb;
