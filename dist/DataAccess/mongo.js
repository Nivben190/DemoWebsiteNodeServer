"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbUrl = exports.getDb = void 0;
const mongodb_1 = require("mongodb");
const env_1 = __importDefault(require("../config/env"));
let db = null;
async function connectToMongo() {
    if (db) {
        return db;
    }
    try {
        const client = await mongodb_1.MongoClient.connect(env_1.default.MONGODB_URI);
        db = client.db("demo");
        console.log('Connected to MongoDB');
        return db;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return null;
    }
}
;
async function getDb() {
    if (!db) {
        await connectToMongo();
    }
    return db;
}
exports.getDb = getDb;
;
function getDbUrl() {
    return `${env_1.default.MONGODB_URI}demo`;
}
exports.getDbUrl = getDbUrl;
