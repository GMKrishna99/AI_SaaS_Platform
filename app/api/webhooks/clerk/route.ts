/* eslint-disable camelcase */

// Importing necessary modules and functions
import { clerkClient } from "@clerk/nextjs"; // Importing Clerk client from Clerk SDK for Next.js
import { WebhookEvent } from "@clerk/nextjs/server"; // Importing WebhookEvent type from Clerk SDK for Next.js server
import { headers } from "next/headers"; // Importing headers function from Next.js headers module
import { NextResponse } from "next/server"; // Importing NextResponse function from Next.js server module
import { Webhook } from "svix"; // Importing Webhook class from svix module

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions"; // Importing user action functions

// Handler function for POST requests
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  // Checking if WEBHOOK_SECRET is provided
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers(); // Extracting headers from the request
  const svix_id = headerPayload.get("svix-id"); // Extracting svix-id header
  const svix_timestamp = headerPayload.get("svix-timestamp"); // Extracting svix-timestamp header
  const svix_signature = headerPayload.get("svix-signature"); // Extracting svix-signature header

  // If there are no headers, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json(); // Parsing JSON payload from request body
  const body = JSON.stringify(payload); // Converting payload to string

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET); // Creating a new instance of Webhook with the provided secret

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent; // Verifying the payload integrity using svix headers
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Get the ID and type of the event
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE
  // Handling user creation event
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    // Extracting user data from the event payload
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    // Creating a new user
    const newUser = await createUser(user);

    // Set public metadata for the newly created user
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    // Return success response with the created user data
    return NextResponse.json({ message: "OK", user: newUser });
  }

  // UPDATE
  // Handling user update event
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    // Extracting updated user data from the event payload
    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    };

    // Updating the user
    const updatedUser = await updateUser(id, user);

    // Return success response with the updated user data
    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  // DELETE
  // Handling user deletion event
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    // Deleting the user
    const deletedUser = await deleteUser(id!);

    // Return success response with the deleted user data
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  // Log webhook event details
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  // Return success response
  return new Response("", { status: 200 });
}
