"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLoggerService = void 0;
const mongo_1 = require("../DataAccess/mongo");
class ErrorLoggerService {
    constructor() {
    }
    async logError(error) {
        const db = await (0, mongo_1.getDb)();
        if (!db)
            throw new Error('Database not found');
        const collection = db.collection('errors');
        await collection.insertOne({ error });
    }
}
exports.ErrorLoggerService = ErrorLoggerService;
