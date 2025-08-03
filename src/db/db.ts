import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Please provide mongo url in  .env file");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
export default async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {};
    cached.promise = mongoose
      .connect(MONGO_URL!, opts)
      .then(() => mongoose.connection);
  }
  mongoose.connection.on("connected", () => {
    console.log("DB connected successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("DB connection unsuccessfull:", err);
  });

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
