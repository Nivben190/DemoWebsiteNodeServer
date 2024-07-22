import express from 'express';
import cors from 'cors';
import userRoutes from './Users/routes/userRoutes';
import imagesRoutes from './Images/routes/imagesRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const port = 3000;

//all cors origin
 
app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
//ping route
app.head('/ping', (req, res) => {
    res.send('pong');
  });
app.use('/images', imagesRoutes);
app.use('/users', userRoutes);
async function startServer () {

    try {
        app.listen(port, () => {
      });
    } catch (error) {
    }
  };
  
  startServer();