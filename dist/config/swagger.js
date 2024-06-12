"use strict";
var swaggerJSDoc = require('swagger-jsdoc');
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Demo API',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
    },
    apis: ['./src/Users/routes/*.ts'],
};
var swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
