import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { HttpCodes } from '@libs/http-codes';
import { Messages } from '@libs/messages';

const { REGION, S3_BUCKET, SRC_FOLDER } = process.env;
const s3Client = new S3Client({ region: REGION });

const importProductsFile = async (event) => {
  try {
    const name =
      event && event.queryStringParameters && event.queryStringParameters.name;
    if (!name) {
      return formatJSONResponse(
        { message: Messages.NAME_NOT_PROVIDED },
        HttpCodes.BAD_REQUEST
      );
    }
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: `${SRC_FOLDER}/${name}`,
    });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });
    return formatJSONResponse({ signedUrl }, HttpCodes.OK);
  } catch (err) {
    return formatJSONResponse(
      { message: Messages.INTERNAL_SERVER_ERROR },
      HttpCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(importProductsFile);
