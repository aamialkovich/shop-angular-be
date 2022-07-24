import { client } from '../../db/client';
import { getResponse } from '../../utils/getResponse';
import { statusMessages } from '../../utils/statusMessages';
import { statusCodes } from '../../utils/statusCodes';

export const getProductsList = async () => {
  try {
    console.log('Getting products list');
    await client.connect();
    const { rows } = await client.query(
      'SELECT products.id, products.title, products.price, products.description, stocks.count FROM products inner join stocks on products.id=stocks.product_id'
    );
    return getResponse(JSON.stringify(rows), statusCodes.OK);
  } catch {
    getResponse(
      { message: statusMessages.SERVER_ERROR },
      statusCodes.SERVER_ERROR
    );
  } finally {
    client.end();
  }
};
