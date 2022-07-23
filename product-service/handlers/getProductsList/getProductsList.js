import { fetchProductsList } from '../../db/fetchProductsList';
import { getResponse } from '../../utils/getResponse';
import { errorMessages } from '../../utils/errorMessages';
import { statusCodes } from '../../utils/statusCodes';

export const getProductsList = async () => {
  try {
    const products = await fetchProductsList();
    return getResponse(JSON.stringify(products), statusCodes.OK);
  } catch {
    getResponse(errorMessages.SERVER_ERROR, statusCodes.SERVER_ERROR);
  }
};
