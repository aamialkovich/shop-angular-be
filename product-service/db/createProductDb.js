import { pool } from './pool';

export const createProductDb = async (product) => {
  let clientConnection;
  try {
    clientConnection = await pool.connect();
    await clientConnection.query('BEGIN');
    const res = await clientConnection.query({
      text: `insert into products (title, description, price) values($1, $2, $3) returning id`,
      values: [product.title, product.description, product.price],
    });
    await clientConnection.query({
      text: `insert into stocks (product_id, count) values ($1, $2)`,
      values: [res.rows[0].id, product.count],
    });
    await clientConnection.query('COMMIT');
  } catch {
    if (clientConnection) {
      await clientConnection.query('ROLLBACK');
      throw new Error({
        name: 'DatabaseError',
      });
    }
  } finally {
    clientConnection.release();
  }
};
