import { fetchProductsList } from '../mocks/functions/fetchProductsList';

export const getProductsList = async () => {
  try {
    const products = await fetchProductsList();
    console.log(products[1]);
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
  } catch {
    console.log('some error appeared');
  }
};
