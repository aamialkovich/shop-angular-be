import { productsSchema } from '../../schema/products.schema';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { createProductDb } from '../../db/createProductDb';
import { parseProduct } from './utils/parseProduct';

const { REGION, TOPIC_ARN } = process.env;
const snsClient = new SNSClient({ region: REGION });

export const catalogBatchProcess = async (event) => {
  try {
    for (const record of event.Records) {
      const product = parseProduct(record.body);
      await productsSchema.validateAsync(product);
      await createProductDb(product);
      await snsClient.send(
        new PublishCommand({
          Subject: `Product ${product.title} creation`,
          Message: `Product ${product.title} was created.`,
          TopicArn: TOPIC_ARN,
          MessageAttributes: {
            creed: {
              DataType: 'String',
              StringValue: `${product.title.toLowerCase().includes('creed')}`,
            },
          },
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
};
