"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailAndPassword = exports.registerUser = void 0;
const mongo_1 = require("../../DataAccess/mongo");
var collectionName = 'users';
async function getUsersCollection() {
    const db = await (0, mongo_1.getDb)();
    if (!db) {
        throw new Error('Failed to connect to database');
    }
    return db.collection(collectionName);
}
async function registerUser(user) {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.insertOne(user);
    return result.insertedId;
}
exports.registerUser = registerUser;
async function findUserByEmailAndPassword(email, password) {
    const usersCollection = await getUsersCollection();
    return usersCollection.findOne({ email, password });
    ;
}
exports.findUserByEmailAndPassword = findUserByEmailAndPassword;
