import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
console.log("Connecting to:", process.env.MONGO_URI);
let db;

export async function connectToDatabase() {
  await client.connect();
  db = client.db();
}

export function getDb() {
  if (!db) throw new Error("DB not initialized");
  return db;
}