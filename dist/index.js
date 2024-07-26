"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Users/routes/userRoutes"));
const imagesRoutes_1 = __importDefault(require("./Images/routes/imagesRoutes"));
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express_1.default.json());
//ping route
app.get('/checkConnection', (req, res) => {
    res.send('i am alive');
});
app.use('/images', imagesRoutes_1.default);
app.use('/users', userRoutes_1.default);
async function startServer() {
    try {
        app.listen(port, () => {
        });
    }
    catch (error) {
    }
}
;
startServer();
