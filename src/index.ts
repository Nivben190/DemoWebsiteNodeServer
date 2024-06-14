import express from 'express';
import cors from 'cors';
import { createProductionLogger } from './loggers/mongoProductionLogger';
import { getDb } from './DataAccess/mongo';
import userRoutes from './Users/routes/userRoutes';
import imagesRoutes from './Images/routes/imagesRoutes';
import { Logger } from 'winston';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const port = 3000;
const prodLogger = createProductionLogger();

app.use(cors({
    origin: 'http://localhost:4200' // replace with your client's URL
  }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/images', imagesRoutes);
app.use('/users', userRoutes);
async function startServer () {
  const logger = await prodLogger as Logger;

    try {
        await getDb();
        app.listen(port, () => {
          logger.info(`Server running on port ${port}`);
      });
    } catch (error) {
      logger.error(`Error starting server: ${error}`, error);
    }
  };
  
  startServer();