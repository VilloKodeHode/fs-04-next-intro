// app/components/molecule/ItemList.jsx
"use client";

import { useState } from "react";

export default function ItemList({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  async function addItem() {
    const res = await fetch("/api/mongodb", {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ name: newItem }),
    });
    const newItemRes = await res.json();
    setItems([...items, { _id: newItemRes.insertId, name: newItem }]);
    setNewItem("");
  }

  async function deleteItem(id) {
    await fetch(`/api/mongodb/${id}`, {
      cache: "no-cache",
      method: "DELETE",
    });
    setItems(items.filter((item) => item._id !== id));
  }

  // PUT:

  function startEditing(item) {
    setEditingId(item._id);
    setEditingName(item.name);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingName("");
  }

  async function saveEdit(id) {
    // optimistic update (optional)
    const prev = items;
    const next = items.map((item) =>
      item._id === id ? { ...item, name: editingName } : item
    );
    setItems(next);

    try {
      const res = await fetch(`api/mongodb/${id}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editingName }),
      });

      const json = await res.json();
      if (!res.ok || !json.updated) {
        setItems(prev);
        throw new Error("Failed to update item");
      }
    } catch (error) {
      // set items back to the previous state if the update fails
      setItems(prev);
    } finally {
      cancelEditing();
    }
  }

  return (
    <>
      <div>
        <input
          className="border"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
        <ul className="grid gap-8">
          {items.map((item) => (
            <li key={item._id}>
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
