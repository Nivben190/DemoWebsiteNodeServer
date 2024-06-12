
import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../DataAccess/mongo";

var collectionName = 'users';
async function getUsersCollection(): Promise<Collection> {
    const db = await getDb();
    if (!db) {
        throw new Error('Failed to connect to database');
    }
    return db.collection(collectionName);
}

async function registerUser(user: any): Promise<ObjectId> {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.insertOne(user);
    return result.insertedId;
}

async function findUserByEmailAndPassword(email: string, password: string): Promise<any> {
    const usersCollection = await getUsersCollection();
     return usersCollection.findOne({ email, password });
        ;
}

export { registerUser, findUserByEmailAndPassword };