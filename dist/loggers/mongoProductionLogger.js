"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductionLogger = void 0;
const mongo_1 = require("../DataAccess/mongo");
const winston = require('winston');
require('winston-mongodb');
async function createProductionLogger() {
    const mongoTransport = new winston.transports.MongoDB({
        db: await (0, mongo_1.getDb)(),
        level: 'info',
        collection: 'logs',
        options: { useUnifiedTopology: true },
    });
    mongoTransport.on('error', (error) => {
        console.error('Error occurred while logging to MongoDB:', error);
    });
    const consoleTransport = new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    });
    const logger = winston.createLogger({
        transports: [
            consoleTransport,
            mongoTransport
        ],
    });
    return logger;
}
exports.createProductionLogger = createProductionLogger;
