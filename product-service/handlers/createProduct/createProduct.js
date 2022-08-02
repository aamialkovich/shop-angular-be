import { getResponse } from '../../utils/getResponse';
import { responseMessages } from '../../utils/responseMessages';
import { statusCodes } from '../../utils/statusCodes';
import { productsSchema } from '../../schema/products.schema';
import { createProductDb } from '../../db/createProductDb';

export const createProduct = async (event) => {
  try {
    console.log(`Create product: ${event}`);
    const product = JSON.parse(event.body);
    await productsSchema.validateAsync(product);
    await createProductDb(product);
    return getResponse(
      { message: responseMessages.SUCCESSFULLY_CREATED },
      statusCodes.OK
    );
  } catch (e) {
    if (e.name === 'ValidationError') {
      return getResponse(
        { message: responseMessages.INVALID_DATA },
        statusCodes.BAD_REQUEST
      );
    }
    return getResponse(
      { message: responseMessages.SERVER_ERROR },
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
