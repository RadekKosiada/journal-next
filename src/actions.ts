"use server";

import client from "./lib/mongodb";

export async function testDatabaseConnection() {
  const isConnected = false;
  try {
    const mongoClient = await client.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}