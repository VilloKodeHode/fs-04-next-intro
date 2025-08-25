// app/api/mongodb/route.js
// This API route handles GET and POST requests for the 'testing-items' collection in MongoDB.
// GET: Returns all items from the collection.
// POST: Adds a new item to the collection, associating it with the current user.
import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";

// Handles GET requests: fetches all items from the database
export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("testing-items").find({}).toArray();
  return Response.json(items);
}

// Handles POST requests: adds a new item to the database with the current user's ID
export async function POST(request) {
  const { userId } = await auth(); // Get the user ID from Clerk
  const data = await request.json(); // Parse the request body
  const db = await connectToDatabase();
  const result = await db
    .collection("testing-items")
    .insertOne({ ...data, ownerId: userId });
  return Response.json({ insertedId: result.insertedId });
}
