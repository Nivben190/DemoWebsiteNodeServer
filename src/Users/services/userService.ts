
import { Collection, ObjectId } from "mongodb";

var collectionName = 'users';
async function getUsersCollection(): Promise<Collection> {
    // const db = await getDb();
    // if (!db) {
    //     throw new Error('Failed to connect to database');
    // }
    // return db.collection(collectionName);
    return new Collection();
}

async function registerUser(user: any): Promise<ObjectId> {
    // const usersCollection = await getUsersCollection();
    // const result = await usersCollection.insertOne(user);
    // return result.insertedId;
    return new ObjectId();
}

async function findUserByEmailAndPassword(email: string, password: string): Promise<any> {
    const usersCollection = await getUsersCollection();
     return usersCollection.findOne({ email, password });
        ;
}

export { registerUser, findUserByEmailAndPassword };