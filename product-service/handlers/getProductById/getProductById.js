import { fetchProductsList } from '../../mocks/functions/fetchProductsList';
import { getResponse } from '../../utils/getResponse';
import { errorMessages } from '../../utils/errorMessages';
import { statusCodes } from '../../utils/statusCodes';

export const getProductById = async (event) => {
  try {
    const productId = event.pathParameters && event.pathParameters.productId;
    const products = await fetchProductsList();
    const foundProduct = products.find((el) => el.id === productId);
    return foundProduct
      ? getResponse(JSON.stringify(foundProduct), statusCodes.OK)
      : getResponse(errorMessages.NOT_FOUND, statusCodes.NOT_FOUND);
  } catch {
    getResponse(errorMessages.SERVER_ERROR, statusCodes.SERVER_ERROR);
  }
};
