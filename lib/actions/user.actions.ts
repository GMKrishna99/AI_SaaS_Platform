"use server";
// Importing necessary modules and functions
import { revalidatePath } from "next/cache"; // Importing revalidatePath function from next/cache
import User from "../database/models/user.model"; // Importing User model from ../database/models/user.model
import { connectToDatabase } from "../database/mongoose"; // Importing connectToDatabase function from ../database/mongoose
import { handleError } from "../utils"; // Importing handleError function from ../utils

// CREATE
// Function to create a new user
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    // Create a new user in the database using the User model
    const newUser = await User.create(user);

    // Return the newly created user
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error); // Handle any errors that occur
  }
}

// READ
// Function to get a user by their ID
export async function getUserById(userId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find a user in the database by their clerkId
    const user = await User.findOne({ clerkId: userId });

    // If user is not found, throw an error
    if (!user) throw new Error("User not found");

    // Return the found user
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error); // Handle any errors that occur
  }
}

// UPDATE
// Function to update a user's information
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find and update the user in the database by their clerkId
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    // If user update fails, throw an error
    if (!updatedUser) throw new Error("User update failed");

    // Return the updated user
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error); // Handle any errors that occur
  }
}

// DELETE
// Function to delete a user
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find the user to delete in the database by their clerkId
    const userToDelete = await User.findOne({ clerkId });

    // If user is not found, throw an error
    if (!userToDelete) {
      throw new Error("User not found for deletion");
    }

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    // Invalidate cache for the homepage
    revalidatePath("/");

    // Return the deleted user or null if not found
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error); // Handle any errors that occur
  }
}

// USE CREDITS
// Function to update a user's credit balance
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase(); // Connect to the database

    // Update the user's credit balance by the specified amount
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    // If user credits update fails, throw an error
    if (!updatedUserCredits) throw new Error("User credits update failed");

    // Return the updated user's credit balance
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error); // Handle any errors that occur
  }
}
