import dotenv from 'dotenv';

dotenv.config();

const { PORT, DB_URI } = process.env;

const SWAGGER_CONFIG = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SAF API DEFINITIONS',
      version: '1.0.0',
      description:
          'This is a REST API application made with For SAF. It retrieves data from SAF Organization.',
      contact: {
        name: 'SAF',
        url: 'https://saf.org',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/**/*routes.ts'], // files containing annotations as above
};

export default {
  port: PORT,
  mongo: DB_URI,
  swagger: SWAGGER_CONFIG
};
