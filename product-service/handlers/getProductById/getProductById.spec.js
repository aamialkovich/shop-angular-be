import { getProductById } from './getProductById';
import { fetchProductsList } from '../../mocks/functions/fetchProductsList';
import { statusCodes } from '../../utils/statusCodes';

jest.mock('../../mocks/functions/fetchProductsList');
const products = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
];

describe('getProductById', () => {
  it('should return 200 code in case product was found', async () => {
    fetchProductsList.mockImplementation(() => products);
    expect(
      (await getProductById({ pathParameters: { productId: 1 } })).statusCode
    ).toBe(statusCodes.OK);
  });

  it('should return 404 code in case product was not found', async () => {
    fetchProductsList.mockImplementation(() => products);
    expect(
      (await getProductById({ pathParameters: { productId: 5 } })).statusCode
    ).toBe(statusCodes.NOT_FOUND);
  });
});
