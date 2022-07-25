import { getResponse } from '../../utils/getResponse';
import { responseMessages } from '../../utils/responseMessages';
import { statusCodes } from '../../utils/statusCodes';
import { getProductsListDb } from '../../db/getProductsListDb';

export const getProductsList = async () => {
  try {
    console.log('Getting products list');
    const products = await getProductsListDb();
    return getResponse(products, statusCodes.OK);
  } catch {
    return getResponse(
      { message: responseMessages.SERVER_ERROR },
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
