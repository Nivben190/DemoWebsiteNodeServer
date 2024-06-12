"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var winston_elasticsearch_1 = require("winston-elasticsearch");
var esTransportOpts = {
    level: 'info',
    index: 'logs',
    clientOpts: {
        node: 'https://4c3b9fa142124db19ca990586a4fd571.us-central1.gcp.cloud.es.io:443',
    },
};
var logger = winston_1.default.createLogger({
    format: winston_1.default.format.json(),
    transports: [
        new winston_elasticsearch_1.ElasticsearchTransport(esTransportOpts),
    ],
});
exports.default = logger;
