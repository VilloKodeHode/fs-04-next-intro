// app/api/user/create/route.js
// This API route handles POST requests to create a user in the database if they don't already exist.
// It uses Clerk for authentication and MongoDB for storage.
import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";

// Handles POST requests: creates a user if not already present
export async function POST() {
  const { userId } = await auth(); // Get the user ID from Clerk
  console.log(userId); // Log the user ID for debugging
  if (!userId) return new Response("Unauthorized", { status: 401 }); // Block if not authenticated

  const db = await connectToDatabase();
  const existingUser = await db
    .collection("users")
    .findOne({ clerkId: userId });

  // If the user does not exist, insert them into the database
  if (!existingUser) {
    await db
      .collection("users")
      .insertOne({ clerkId: userId, createdAt: new Date() });
  }

  // Respond with the user ID
  return new Response(JSON.stringify({ userId }), { status: 200 });
}
