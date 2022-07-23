import { fetchProductsList } from '../../db/fetchProductsList';
import { statusCodes } from '../../utils/statusCodes';
import { getProductsList } from './getProductsList';

jest.mock('../../mocks/functions/fetchProductsList');
const products = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
];

describe('getProductsList', () => {
  it('should return 200 code when products are received', async () => {
    fetchProductsList.mockImplementation(() => products);
    expect((await getProductsList()).statusCode).toBe(statusCodes.OK);
  });
});
