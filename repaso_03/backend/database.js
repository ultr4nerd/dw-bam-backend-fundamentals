import mongoose from "mongoose";

export async function setupDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database...");
  } catch (err) {
    console.error("Couldn't connect to Mongo", err);
    process.exit(1);
  }
}
