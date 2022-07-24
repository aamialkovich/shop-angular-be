import { getResponse } from '../../utils/getResponse';
import { statusMessages } from '../../utils/statusMessages';
import { statusCodes } from '../../utils/statusCodes';
import { pool } from '../../db/pool';

export const getProductById = async (event) => {
  let clientConnection;
  try {
    const productId = event.pathParameters && event.pathParameters.productId;
    console.log(`Product id ${productId}`)
    clientConnection = await pool.connect();
    const { rows } = await clientConnection.query({
      text: `SELECT products.id, products.title, products.price, products.description,
        stocks.count FROM products inner join stocks on products.id=stocks.product_id
        WHERE products.id = $1`,
      values: [productId],
    });
    return getResponse(JSON.stringify(rows), statusCodes.OK);
  } catch (e) {
    return getResponse(
      { message: statusMessages.SERVER_ERROR },
      statusCodes.SERVER_ERROR
    );
  } finally {
    clientConnection.release();
  }
};
