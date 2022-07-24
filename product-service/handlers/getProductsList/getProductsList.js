import { pool } from '../../db/pool';
import { getResponse } from '../../utils/getResponse';
import { statusMessages } from '../../utils/statusMessages';
import { statusCodes } from '../../utils/statusCodes';

export const getProductsList = async () => {
  let clientConnection;
  try {
    console.log('Getting products list');
    clientConnection = await pool.connect();
    const { rows } = await clientConnection.query(
      'SELECT products.id, products.title, products.price, products.description, stocks.count FROM products inner join stocks on products.id=stocks.product_id'
    );
    return getResponse(JSON.stringify(rows), statusCodes.OK);
  } catch {
    return getResponse(
      { message: statusMessages.SERVER_ERROR },
      statusCodes.SERVER_ERROR
    );
  } finally {
    clientConnection.release();
  }
};
