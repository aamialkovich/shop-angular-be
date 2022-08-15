import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Messages } from '@libs/messages';
import { HttpCodes } from '@libs/http-codes';

const { REGION, SRC_FOLDER, DEST_FOLDER, SQS_URL } = process.env;
const s3Client = new S3Client({ region: REGION });
const sqsClient = new SQSClient({ region: REGION });

const importFileParser = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const { bucket, object } = record.s3;
      const bucketObject = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucket.name,
          Key: object.key,
        })
      );
      await new Promise((resolve) => {
        bucketObject.Body.pipe(csv())
          .on('data', (record) => {
            const command = new SendMessageCommand({
              QueueUrl: SQS_URL,
              MessageBody: JSON.stringify(record),
            });
            sqsClient.send(command);
          })
          .on('end', resolve);
      });
      await s3Client.send(
        new CopyObjectCommand({
          Bucket: bucket.name,
          CopySource: `${bucket.name}/${object.key}`,
          Key: `${object.key}`.replace(SRC_FOLDER, DEST_FOLDER),
        })
      );
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket.name,
          Key: `${object.key}`,
        })
      );
    }
    return formatJSONResponse({ message: Messages.SUCCESS }, HttpCodes.OK);
  } catch {
    return formatJSONResponse(
      { message: Messages.INTERNAL_SERVER_ERROR },
      HttpCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const main = middyfy(importFileParser);
