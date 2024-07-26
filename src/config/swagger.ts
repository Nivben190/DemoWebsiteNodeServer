const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo API',
      version: '1.0.0',
      description: 'API documentation for your Node.js application',
    },
  },
  apis: ['./src/Users/routes/*.ts', './src/Images/routes/*.ts', './src/filters/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;