// app/(pages)/about/page.jsx
//
// This page fetches all items from the backend API and displays them using the ItemList component.
// It demonstrates server-side data fetching in a Next.js page and passing data as props to a child component.
//
// Imports:
//   ItemList: a component for displaying and managing a list of items
import ItemList from "@/app/components/molecule/ItemList";

// The main About page component
export default async function AboutPage() {
  // Determine the base URL for the API (useful for local/dev/prod environments)
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/";
  console.log(baseUrl); // Log the base URL for debugging

  // Fetch all items from the backend API (server-side)
  const data = await fetch(`${baseUrl}/api/mongodb`, {
    method: "GET",
    cache: "no-store",
  });

  // Parse the response as JSON to get the items array
  const items = await data.json();

  console.log(items); // Log the items for debugging

  // Render the about page and pass the items to the ItemList component
  return (
    <>
      <h1>This is about Sparta!</h1>
      <p>This is the about page</p>
      <ItemList initialItems={items} />
    </>
  );
}
