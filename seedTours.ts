import mongoose from "mongoose";
import Tour from "./model/tourModel.js"; // Use correct relative path and include .js
import tours from "./files/tours.json" assert { type: "json" }; // JSON import needs assertion

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/yourdbname"
    );
    console.log("Connected to MongoDB");

    await Tour.deleteMany({});
    console.log("Cleared existing tours");

    await Tour.insertMany(tours);
    console.log("Inserted tours into database");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding tours:", error);
    process.exit(1);
  }
}

seed();
