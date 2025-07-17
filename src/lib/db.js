import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MongoURL);
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
}
