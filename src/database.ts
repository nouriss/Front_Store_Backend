import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

console.log(POSTGRES_HOST);
console.log(POSTGRES_USER);
console.log(ENV);
console.log(POSTGRES_DEV_DB);
console.log(POSTGRES_TEST_DB);

let Client;
if (ENV === 'dev') {
  try {
    Client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DEV_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
  } catch (error) {
    throw new Error(`Can't connect to database ${POSTGRES_DEV_DB}`);
  }
}

if (ENV === 'test') {
  try {
    Client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
  } catch (error) {
    throw new Error(`Can't connect to database ${POSTGRES_TEST_DB}`);
  }
}

export default Client;
