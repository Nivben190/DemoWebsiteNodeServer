import express from 'express';
import cors from 'cors';
import filterRoutes from './filters/routes/filtersRoute';
import userRoutes from './Users/routes/userRoutes';
import imagesRoutes from './Images/routes/imagesRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const port = 3000;


 
app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
//ping route
app.get('/checkConnection', (req, res) => {
    res.send('i am alive');
  });
app.use('/images', imagesRoutes);
app.use('/users', userRoutes);
app.use('/filters', filterRoutes);
async function startServer () {

    try {
        app.listen(port, () => {
      });
    } catch (error) {
    }
  };
  
  startServer();