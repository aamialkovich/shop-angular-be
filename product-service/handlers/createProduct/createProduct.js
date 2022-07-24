import { getResponse } from '../../utils/getResponse';
import { statusMessages } from '../../utils/statusMessages';
import { statusCodes } from '../../utils/statusCodes';
import { pool } from '../../db/pool';
import { productsSchema } from '../../schema/products.schema';

export const createProduct = async (event) => {
  let clientConnection;
  try {
    console.log(`Create product: ${event}`);
    const product = JSON.parse(event.body);
    await productsSchema.validateAsync(product);
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
    return getResponse(
      { message: statusMessages.SUCCESSFULLY_CREATED },
      statusCodes.OK
    );
  } catch {
    if (clientConnection) {
      await clientConnection.query('ROLLBACK');
    }
    return getResponse(
      { message: statusMessages.INVALID_DATA },
      statusCodes.INVALID_DATA
    );
  } finally {
    clientConnection.release();
  }
};
