// Importing necessary modules from Mongoose library
import { Schema, model, models } from "mongoose";

// Defining a Mongoose schema for User documents
const UserSchema = new Schema({
  // Unique identifier for the user (required, unique)
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  // Email of the user (required, unique)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Username of the user (required, unique)
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // URL to the user's photo (required)
  photo: {
    type: String,
    required: true,
  },
  // First name of the user
  firstName: {
    type: String,
  },
  // Last name of the user
  lastName: {
    type: String,
  },
  // Plan ID of the user (default: 1)
  planId: {
    type: Number,
    default: 1,
  },
  // Credit balance of the user (default: 10)
  creditBalance: {
    type: Number,
    default: 10,
  },
});

// Defining a Mongoose model for User documents, reusing if already defined
const User = models?.User || model("User", UserSchema);

// Exporting the User model
export default User;
