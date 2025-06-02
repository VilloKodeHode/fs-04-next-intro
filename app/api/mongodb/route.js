import { connectToDataBase } from "@/app/lib/mongoDBconnect";

export async function GET() {
  const db = await connectToDataBase();
  const items = await db
    .collection("testing-items")
    .find({ category: "potion" })
    .toArray();
  return Response.json(items);
}
