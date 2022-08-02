import { getResponse } from '../../utils/getResponse';
import { responseMessages } from '../../utils/responseMessages';
import { statusCodes } from '../../utils/statusCodes';
import { getProductByIdDb } from '../../db/getProductByIdDb';

export const getProductById = async (event) => {
  try {
    const productId = event.pathParameters && event.pathParameters.productId;
    console.log(`Product id ${productId}`);
    const product = await getProductByIdDb(productId);
    return getResponse(product, statusCodes.OK);
  } catch (e) {
    return getResponse(
      { message: responseMessages.SERVER_ERROR },
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
