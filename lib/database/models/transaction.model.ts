// Importing necessary modules from Mongoose library
import { Schema, model, models } from "mongoose";

// Defining a Mongoose schema for Transaction documents
const TransactionSchema = new Schema({
  // Timestamp for when the transaction was created (default: current date/time)
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Unique identifier for the transaction (required, unique)
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  // Amount of the transaction (required)
  amount: {
    type: Number,
    required: true,
  },
  // Plan associated with the transaction
  plan: {
    type: String,
  },
  // Number of credits associated with the transaction
  credits: {
    type: Number,
  },
  // Reference to the buyer (User model)
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Defining a Mongoose model for Transaction documents, reusing if already defined
const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

// Exporting the Transaction model
export default Transaction;
