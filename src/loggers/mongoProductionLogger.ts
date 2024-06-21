
import { getDb } from "../DataAccess/mongo";
const winston = require('winston');
require('winston-mongodb');


export async function createProductionLogger() {
  const mongoTransport = new winston.transports.MongoDB({
    db: await getDb(),
    level: 'info',
    collection: 'logs',
    
    
    options: { useUnifiedTopology: true },
  });
  mongoTransport.on('error', (error:any) => {
    console.error('Error occurred while logging to MongoDB:', error);
  });

  const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  });
  const logger = winston.createLogger({
    transports: [
      consoleTransport,
      mongoTransport
    ],
  });
  return logger;
}

