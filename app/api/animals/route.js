// app/api/animals/route.js
// This API route handles GET requests and returns a static list of animal objects as JSON.
// Each animal has an id, name, species, image, and description.
import { NextResponse } from "next/server";

// Handles GET requests: returns a hardcoded list of animals
export async function GET() {
  return NextResponse.json([
    {
      id: 0,
      name: "Veslepus",
      species: "Katt",
      image: "/cat.png",
      description: "En rampete katt som elsker eventyr.",
    },
    {
      id: 1,
      name: "Brutus",
      species: "Hund",
      image: "/dog.png",
      description: "En lojal følgesvenn med et stort hjerte.",
    },
    {
      id: 2,
      name: "Klakke",
      species: "And",
      image: "/duck.png",
      description: "Snakkesalig og nysgjerrig på alt.",
    },
  ]);
}
