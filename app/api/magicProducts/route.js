// app/api/magicProducts/route.js
// This API route handles GET requests and returns a static list of magic product objects as JSON.
// Each product has an id, title, category, image, price, description, and stock.
import { NextResponse } from "next/server";

// Handles GET requests: returns a hardcoded list of magic products
export async function GET() {
  return NextResponse.json([
    {
      id: 0,
      title: "Massive mana potion",
      category: "potion",
      image: "/massive-mana-potion.webp",
      price: 49.99,
      description: "A powerful mana potion for magic users.",
      stock: 12,
    },
    {
      id: 1,
      title: "Fire resistance potion",
      category: "potion",
      image: "/fire-resistance-potion.webp",
      price: 89.99,
      description: "A potion that grants fire resistance.",
      stock: 5,
    },
  ]);
}
