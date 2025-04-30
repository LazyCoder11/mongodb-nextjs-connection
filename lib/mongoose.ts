import mongoose from "mongoose";

const connectionToDatabase = async (): Promise<void> => {
  const mongoUrl = process.env.MongoURL;

  if (!mongoUrl) {
    throw new Error("MongoURL is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUrl);
    console.info("Connected to DB");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectionToDatabase;
