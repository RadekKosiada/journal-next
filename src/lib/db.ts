import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI not not found!")
};

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// connecting to a certain DB
async function getDB(dbName: string) {
    try {
        await client.connect()
        console.log('>>> Connected to DB <<<<');
        return client.db(dbName);
    } catch (error) {
        console.log(error)
    }
}

// gives us a collection
export async function getCollection(collectionName: string) {
    const db = await getDB('journal_next_db');
    if (db) {
        return db.collection(collectionName)
    } else {
        return null;
    }
}