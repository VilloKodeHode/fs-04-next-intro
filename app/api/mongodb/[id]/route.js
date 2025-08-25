// app/api/mongodb/[id]/route.js
//
// This file defines API endpoints for handling HTTP PUT and DELETE requests for a single item in the 'testing-items' MongoDB collection.
//
// - PUT: Update an existing item in the database, identified by its MongoDB ObjectId (passed as a URL parameter).
// - DELETE: Remove an item from the database, also identified by its ObjectId.
//
// The file uses Next.js API route conventions and expects to be called from the frontend or other backend code.
//
// Imports:
//   connectToDatabase: a helper function to connect to the MongoDB database
//   ObjectId: a MongoDB utility to work with unique document IDs
import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { ObjectId } from "mongodb";

/**
 * PUT handler: Update a single item in the database
 * @param {Request} request - The HTTP request object, containing the body with updated data
 * @param {Object} context - Contains route parameters, including the item ID
 * @returns {Response} - JSON response indicating if the update was successful
 *
 * Steps:
 *   1. Extract the 'id' parameter from the URL (context.params).
 *   2. Parse the request body to get the new data for the item.
 *   3. Connect to the MongoDB database.
 *   4. Use the 'updateOne' method to update the document with the matching _id.
 *   5. Return a JSON response indicating success.
 */
export async function PUT(request, { params }) {
  const param = params; // Contains the route parameters, e.g., { id: '...' }
  // Parse the JSON body of the request to get the updated fields
  const data = await request.json();
  // Connect to the MongoDB database
  const db = await connectToDatabase();
  // Update the document in the 'testing-items' collection with the given _id
  await db.collection("testing-items").updateOne(
    { _id: ObjectId.createFromHexString(param.id) }, // Find by ObjectId
    { $set: data } // Set the new data
  );
  // Respond with a JSON object indicating the update was successful
  return Response.json({ updated: true });
}

/**
 * DELETE handler: Remove a single item from the database
 * @param {Request} _ - The HTTP request object (not used here)
 * @param {Object} context - Contains route parameters, including the item ID
 * @returns {Response} - JSON response indicating if the deletion was successful
 *
 * Steps:
 *   1. Extract the 'id' parameter from the URL (context.params).
 *   2. Connect to the MongoDB database.
 *   3. Use the 'deleteOne' method to remove the document with the matching _id.
 *   4. Return a JSON response indicating success.
 */
export async function DELETE(_, { params }) {
  // The first parameter (named _ by convention) is the HTTP request object, which is not used in this handler.
  // Using _ signals to other developers that this argument is intentionally ignored.
  const param = params; // Contains the route parameters, e.g., { id: '...' }

  // Step 1: Connect to the MongoDB database using the helper function
  const db = await connectToDatabase();

  // Step 2: Delete the document in the 'testing-items' collection with the given _id
  // - param.id is the string representation of the MongoDB ObjectId from the URL
  // - ObjectId.createFromHexString(param.id) converts it to a MongoDB ObjectId type
  await db
    .collection("testing-items")
    .deleteOne({ _id: ObjectId.createFromHexString(param.id) });

  // Step 3: Respond with a JSON object indicating the deletion was successful
  return Response.json({ deleted: true });
}
