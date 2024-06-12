import { Db, MongoClient } from 'mongodb';
import env from '../config/env';


let db: Db | null = null;

  async function connectToMongo(): Promise<Db | null> {
  if (db) {
    return db;
  }

  try {
    const client = await MongoClient.connect(env.MONGODB_URI);
    db = client.db("demo"); 
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
};

export async function getDb() {
  if (!db) {
    await connectToMongo();
  }
  return db;
};

