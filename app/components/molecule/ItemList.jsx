// app/components/molecule/ItemList.jsx
//
// This React component displays a list of items and allows the user to:
//   - Add new items (POST to API)
//   - Delete items (DELETE to API)
//   - Edit item names (PUT to API)
//
// It demonstrates optimistic UI updates, controlled components, and basic CRUD operations with a backend API.
//
// Props:
//   initialItems: Array of item objects to display initially. Each item should have an _id and name property.
//
// State:
//   items: The current list of items displayed
//   newItem: The value of the input for adding a new item
//   editingId: The _id of the item currently being edited (or null)
//   editingName: The value of the input for editing an item
//
// Functions:
//   addItem: Sends a POST request to add a new item
//   deleteItem: Sends a DELETE request to remove an item
//   startEditing: Sets up editing state for an item
//   cancelEditing: Cancels editing mode
//   saveEdit: Sends a PUT request to update an item, with optimistic UI update
//
// The UI renders an input for adding items, and for each item, shows either its name with Edit/Delete buttons or an editing form.
"use client";

import { useState } from "react";

// The main component for displaying and managing a list of items
export default function ItemList({ initialItems }) {
  // State for the list of items
  const [items, setItems] = useState(initialItems);
  // State for the new item input field
  const [newItem, setNewItem] = useState("");
  // State for tracking which item is being edited
  const [editingId, setEditingId] = useState(null);
  // State for the editing input field
  const [editingName, setEditingName] = useState("");

  // Add a new item to the list and backend
  async function addItem() {
    // Send a POST request to the API to create a new item
    const res = await fetch("/api/mongodb", {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ name: newItem }),
    });
    // Parse the response to get the new item's ID
    const newItemRes = await res.json();
    // Update the local state to include the new item
    setItems([...items, { _id: newItemRes.insertId, name: newItem }]);
    // Clear the input field
    setNewItem("");
  }

  // Delete an item from the list and backend
  async function deleteItem(id) {
    // Send a DELETE request to the API for the given item ID
    await fetch(`/api/mongodb/${id}`, {
      cache: "no-cache",
      method: "DELETE",
    });
    // Remove the item from local state
    setItems(items.filter((item) => item._id !== id));
  }

  // Start editing an item: set the editing state
  function startEditing(item) {
    setEditingId(item._id);
    setEditingName(item.name);
  }

  // Cancel editing mode and reset editing state
  function cancelEditing() {
    setEditingId(null);
    setEditingName("");
  }

  /**
   * Save the edited item name to the backend and update local state.
   * Uses optimistic UI update: updates the UI before the server responds, and reverts if the request fails.
   * @param {string} id - The _id of the item being edited
   */
  async function saveEdit(id) {
    // Store the previous state in case we need to revert
    const prev = items;
    // Create a new array with the updated item name
    const next = items.map((item) =>
      item._id === id ? { ...item, name: editingName } : item
    );
    setItems(next); // Optimistically update UI

    try {
      // Send a PUT request to update the item in the backend
      const res = await fetch(`api/mongodb/${id}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editingName }),
      });

      const json = await res.json();
      // If the update failed, revert to previous state
      if (!res.ok || !json.updated) {
        setItems(prev);
        throw new Error("Failed to update item");
      }
    } catch (error) {
      // If the request fails, revert to previous state
      setItems(prev);
    } finally {
      // Always exit editing mode
      cancelEditing();
    }
  }

  // Render the UI: input for adding, list of items, and edit/delete controls
  return (
    <>
      <div>
        {/* Input for adding a new item */}
        <input
          className="border"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
        {/* List of items */}
        <ul className="grid gap-8">
          {items.map((item) => (
            <li key={item._id}>
              {/* If this item is being edited, show editing form */}
              {editingId === item._id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(item._id)}
                    className="border m-2 p-2 bg-green-600">
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="border m-2 p-2 bg-red-600">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* Show item name and edit/delete buttons */}
                  <span>{item.name}</span>
                  <button
                    onClick={() => startEditing(item)}
                    className="border m-2 p-2 bg-slate-600">
                    Edit
                  </button>
                  <button
                    className=" p-2 text-red-500"
                    onClick={() => deleteItem(item._id)}>
                    X
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// "use client";
// import { useState } from "react";

// export default function ItemList({ initialItems }) {
//   const [items, setItems] = useState(initialItems);
//   const [newItem, setNewItem] = useState("");

//   async function addItem() {
//     const res = await fetch("/api/mongodb", {
//       cache: "no-store",
//       method: "POST",
//       body: JSON.stringify({ name: newItem }),
//     });
//     const newItemRes = await res.json();
//     setItems([...items, { _id: newItemRes.insertedId, name: newItem }]);
//     setNewItem("");
//   }

//   async function deleteItem(id) {
//     await fetch(`/api/mongodb/${id}`, { cache: "no-store", method: "DELETE" });
//     setItems(items.filter((item) => item._id !== id));
//   }

//   return (
//     <div>
//       <input
//         value={newItem}
//         onChange={(e) => setNewItem(e.target.value)}
//         placeholder="New item"
//       />
//       <button onClick={addItem}>Add</button>
//       <ul>
//         {items.map((item) => (
//           <li key={item._id}>
//             {item.name} <button onClick={() => deleteItem(item._id)}>X</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
