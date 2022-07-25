import { pool } from './pool';

export const getProductsListDb = async () => {
  let clientConnection;
  try {
    clientConnection = await pool.connect();
    const { rows } = await clientConnection.query(
      'SELECT products.id, products.title, products.price, products.description, stocks.count FROM products inner join stocks on products.id=stocks.product_id'
    );
    return rows;
  } catch (e) {
    throw new Error({
      name: 'DatabaseError',
    });
  } finally {
    clientConnection.release();
  }
};
