// app/(pages)/dashboard/page.jsx
//
// This page displays a personalized dashboard for the logged-in user.
// It fetches items from the database that belong to the current user and lists them.
//
// Imports:
//   connectToDatabase: helper to connect to MongoDB
//   auth: Clerk authentication to get the current user
import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { auth } from "@clerk/nextjs/server";

// The main dashboard page component
export default async function DashboardPage() {
  // Get the current user's ID using Clerk authentication
  const { userId } = await auth();
  if (!userId) return <p>Du er ikke pålogget!</p>; // Show message if not logged in

  // Connect to the MongoDB database
  const db = await connectToDatabase();

  // Fetch all items from the database that belong to the current user
  const userItems = await db
    .collection("testing-items")
    .find({ ownerId: userId })
    .toArray();

  // Render the dashboard UI
  return (
    <>
      <h1>Min personlige side</h1>
      {/* Show a message if the user has no items */}
      {userItems.length === 0 && (
        <>
          <p>du har ikke lagt til noen elementer enda</p>
        </>
      )}
      {/* List all items belonging to the user */}
      {userItems.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
        </div>
      ))}
    </>
  );
}
