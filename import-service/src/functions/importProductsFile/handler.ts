import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { queryStringParameters } = event;
  return formatJSONResponse({
    message: `Hello ${JSON.stringify(
      queryStringParameters
    )}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(importProductsFile);
