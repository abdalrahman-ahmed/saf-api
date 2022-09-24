import dotenv from 'dotenv';

dotenv.config();

const { PORT, DB_URI, TOKEN_SECRET } = process.env;

export default {
  port: PORT,
  mongo: DB_URI,
  tokenSecretKey: TOKEN_SECRET,
};
