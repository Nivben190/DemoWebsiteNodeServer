import express from 'express';
import cors from 'cors';
import { getDb } from './DataAccess/mongo';
import userRoutes from './Users/routes/userRoutes';
import imagesRoutes from './Images/routes/imagesRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://localhost:3000/' // replace with your client's URL
  }));app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  
  app.use(express.json());
  app.use('/images', imagesRoutes);
app.use('/users', userRoutes);

async function startServer () {
    try {
        await getDb();
        app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };
  
  startServer();