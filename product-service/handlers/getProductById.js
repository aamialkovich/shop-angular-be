import { fetchProductsList } from '../mocks/functions/fetchProductsList';

export const getProductById = async (event) => {
  try {
    const productId = event.pathParameters && event.pathParameters.productId;
    const products = await fetchProductsList();
    return {
      statusCode: 200,
      body: JSON.stringify(products.find((el) => el.id === productId)),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
  } catch {
    console.log('Error');
  }
};
