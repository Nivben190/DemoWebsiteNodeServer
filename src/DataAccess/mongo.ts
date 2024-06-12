import { MongoClient } from 'mongodb';
import env from '../config/env';
const dbName = 'your-database-name';

async  function connectToMongo() {
    try {
        const client = await MongoClient.connect(env.MONGODB_URI);
        const db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const db = connectToMongo();


export default db;