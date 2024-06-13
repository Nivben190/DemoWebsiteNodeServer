"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoProductionLogger_1 = require("./loggers/mongoProductionLogger");
const elasticSearchLogger_1 = require("./loggers/elasticSearchLogger");
const userRoutes_1 = __importDefault(require("./Users/routes/userRoutes"));
const imagesRoutes_1 = __importDefault(require("./Images/routes/imagesRoutes"));
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = (0, express_1.default)();
const port = 3000;
const prodLogger = (0, mongoProductionLogger_1.createProductionLogger)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000/' // replace with your client's URL
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express_1.default.json());
app.use('/images', imagesRoutes_1.default);
app.use('/users', userRoutes_1.default);
async function startServer() {
    //const logger = await prodLogger as Logger;
    const elasticLogger = (0, elasticSearchLogger_1.createElasticLogger)();
    try {
        //await getDb();
        app.listen(port, () => {
            elasticLogger.info('Some log message');
            //logger.info(`Server running on port ${port}`);
        });
    }
    catch (error) {
        //logger.error(`Error starting server: ${error}`, error);
    }
}
;
startServer();
