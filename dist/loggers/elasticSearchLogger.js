"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElasticLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const elasticsearch_transport_1 = __importDefault(require("elasticsearch-transport"));
function createElasticLogger() {
    const logger = winston_1.default.createLogger({
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json(), winston_1.default.format.prettyPrint()),
        transports: [
            new elasticsearch_transport_1.default({
                silent: false,
                elasticClient: {
                    node: 'https://322355fb78b94c95975452cf12726173.us-central1.gcp.cloud.es.io:9243/',
                    auth: {
                        apiKey: "V3ZNckU1QUJfb3lzeGJoRDVlZ0I6V0tXOG40M3NRQUdvZEd4VTZFQ2NWQQ=="
                    }
                }
            })
        ],
    });
    logger.info('saving log in elasticsearch!!');
    return logger;
}
exports.createElasticLogger = createElasticLogger;
