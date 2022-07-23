const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const fetchProductsList = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT products.id, products.title, products.price, products.description, stocks.count FROM products inner join stocks on products.id=stocks.product_id'
    );
    return rows;
  } catch (e) {
    return [];
  } finally {
    client.release();
  }
};
