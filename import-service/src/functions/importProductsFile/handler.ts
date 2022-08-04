import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const REGION = 'eu-west-1';
const s3Client = new S3Client({ region: REGION });

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const name =
      event && event.queryStringParameters && event.queryStringParameters.name;
    if (!name) {
      return formatJSONResponse({ message: 'No name provided' }, 400);
    }
    const command = new PutObjectCommand({
      Bucket: 'online-parfum-shop-bucket',
      Key: `uploaded/${name}`,
    });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });
    return formatJSONResponse({ signedUrl }, 200);
  } catch (err) {
    return formatJSONResponse({ message: 'Internal server error' }, 500);
  }
};

export const main = middyfy(importProductsFile);
