import dotenv from 'dotenv';

dotenv.config();

const { PORT, DB_URI } = process.env;

export default {
  port: PORT,
  mongo: DB_URI,
};
