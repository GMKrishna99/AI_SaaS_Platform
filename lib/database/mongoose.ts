// Importing mongoose library and Mongoose interface from it
import mongoose, { Mongoose } from "mongoose";

// Getting the MongoDB connection URL from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

// Defining an interface to hold mongoose connection and promise
interface MongooseConnection {
  conn: Mongoose | null; // Mongoose connection object or null if not yet initialized
  promise: Promise<Mongoose> | null; // Promise of mongoose connection or null if not yet initialized
}
// Declaring a variable named 'cashed' of type 'MongooseConnection'
// and assigning it the value of '(global as any).mongoose'
let cached: MongooseConnection = (global as any).mongoose;

// Checking if the 'cashed' variable is falsy (null or undefined)
if (!cached) {
  // If 'cashed' is falsy, initialize it and assign it to '(global as any).mongoose'
  cached = (global as any).mongoose = {
    conn: null, // Initialize 'conn' property as null
    promise: null, // Initialize 'promise' property as null
  };
}

// Exporting an asynchronous function named 'connectToDatabase'
export const connectToDatabase = async () => {
  // If 'cashed.conn' already exists, return it
  if (cached.conn) return cached.conn;

  // If 'MONGODB_URL' is not provided, throw an error
  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, { dbName: "ai", bufferCommands: false });

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
