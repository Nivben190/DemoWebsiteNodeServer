import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const esTransportOpts = {
  level: 'info',
  index: 'logs',
  clientOpts: {
    node: 'https://4c3b9fa142124db19ca990586a4fd571.us-central1.gcp.cloud.es.io:443',
  },
};

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new ElasticsearchTransport(esTransportOpts),
  ],
});

export default logger;