"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailAndPassword = exports.registerUser = void 0;
const mongodb_1 = require("mongodb");
var collectionName = 'users';
async function getUsersCollection() {
    // const db = await getDb();
    // if (!db) {
    //     throw new Error('Failed to connect to database');
    // }
    // return db.collection(collectionName);
    return new mongodb_1.Collection();
}
async function registerUser(user) {
    // const usersCollection = await getUsersCollection();
    // const result = await usersCollection.insertOne(user);
    // return result.insertedId;
    return new mongodb_1.ObjectId();
}
exports.registerUser = registerUser;
async function findUserByEmailAndPassword(email, password) {
    const usersCollection = await getUsersCollection();
    return usersCollection.findOne({ email, password });
    ;
}
exports.findUserByEmailAndPassword = findUserByEmailAndPassword;
