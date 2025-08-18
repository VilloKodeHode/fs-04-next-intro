// app/lib/mongoDBconnect.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "testing-items-database";

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

//! Utestet versjon av koden:
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   throw new Error("Mangler MONGODB_URI i miljøvariabler");
// }

// const options = {};
// let client;
// let clientPromise;

// // I dev ønsker vi å cache på globalThis for å unngå mange nye connections ved hot reload
// if (!globalThis._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   globalThis._mongoClientPromise = client.connect();
// }

// clientPromise = globalThis._mongoClientPromise;

// /**
//  * Hent database-objekt.
//  * Hvis du har satt MONGODB_DB, brukes den – ellers kan du spesifisere ved kall.
//  */
// export async function getDb(dbName = process.env.MONGODB_DB) {
//   const c = await clientPromise;
//   if (!dbName) {
//     throw new Error("Ingen database spesifisert (sett MONGODB_DB eller send inn dbName).");
//   }
//   return c.db(dbName);
// }
