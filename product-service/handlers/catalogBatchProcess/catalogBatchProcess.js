import { productsSchema } from '../../schema/products.schema';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const { REGION, TOPIC_ARN } = process.env;
const snsClient = new SNSClient({ region: REGION });

const command = new PublishCommand({
  Subject: 'Product creation notification',
  Message: 'Products were successfully created',
  TopicArn: TOPIC_ARN,
});

export const catalogBatchProcess = async (event) => {
  try {
    for (const record of event.Records) {
      const product = JSON.parse(record.body);
      console.log(product);
      // await productsSchema.validateAsync(product);
      // await createProductDb(product);
    }
    await snsClient.send(command);
  } catch (e) {
    console.log(e);
  }
};
