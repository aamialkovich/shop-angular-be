import { pool } from './pool';

export const getProductByIdDb = async (productId) => {
  let clientConnection;
  try {
    clientConnection = await pool.connect();
    const { rows } = await clientConnection.query({
      text: `SELECT products.id, products.title, products.price, products.description,
        stocks.count FROM products inner join stocks on products.id=stocks.product_id
        WHERE products.id = $1`,
      values: [productId],
    });
    return rows[0];
  } catch (e) {
    throw new Error({
      name: 'DatabaseError'
    });
  } finally {
    clientConnection.release();
  }
};
