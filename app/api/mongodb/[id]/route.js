// app/api/mongodb/[id]/route.js
import { connectToDatabase } from "@/app/lib/mongoDBconnect";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  const param = params;

  const data = await request.json();
  const db = await connectToDatabase();
  await db
    .collection("testing-items")
    .updateOne({ _id: ObjectId.createFromHexString(param.id) }, { $set: data });
  return Response.json({ updated: true });
}

export async function DELETE(_, { params }) {
  const param = params;
  const db = await connectToDatabase();
  await db
    .collection("testing-items")
    .deleteOne({ _id: ObjectId.createFromHexString(param.id) });
  return Response.json({ deleted: true });
}
