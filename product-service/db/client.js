const { Client } = require('pg');
const { PG_USERNAME, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } = process.env;
export const client = new Client({
  user: PG_USERNAME,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
