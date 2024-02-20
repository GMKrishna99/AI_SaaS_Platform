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
let cashed: MongooseConnection = (global as any).mongoose;

// Checking if the 'cashed' variable is falsy (null or undefined)
if (!cashed) {
  // If 'cashed' is falsy, initialize it and assign it to '(global as any).mongoose'
  cashed = (global as any).mongoose = {
    conn: null, // Initialize 'conn' property as null
    promise: null, // Initialize 'promise' property as null
  };
}

// Exporting an asynchronous function named 'connectToDatabase'
export const connectToDatabase = async () => {
  // If 'cashed.conn' already exists, return it
  if (cashed.conn) return cashed.conn;

  // If 'MONGODB_URL' is not provided, throw an error
  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  // If 'cashed.promise' doesn't exist, initialize it
  cashed.promise =
    cashed.promise ||
    // Use mongoose.connect to establish a connection to MongoDB
    mongoose.connect(MONGODB_URL, { dbName: "aiapp", bufferCommands: false });

  // Wait for the promise in cashed.promise to resolve (i.e., for the MongoDB connection to be established)
  // and assign the resolved value (the Mongoose connection object) to the cashed.conn property
  cashed.conn = await cashed.promise;

  return cashed.conn; // Return the 'cashed.conn' value after the connection is established
};
