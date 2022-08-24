import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION: '${file(../config.json):REGION}',
      S3_BUCKET: '${file(../config.json):S3_BUCKET}',
      S3_BUCKET_ARN: '${file(../config.json):S3_BUCKET_ARN}',
      SRC_FOLDER: 'uploaded',
      DEST_FOLDER: 'parsed',
      SQS_ARN: '${file(../config.json):SQS_ARN}',
      SQS_URL: '${file(../config.json):SQS_URL}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['${self:provider.environment.S3_BUCKET_ARN}'],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: '${self:provider.environment.S3_BUCKET_ARN}/*',
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: '${self:provider.environment.SQS_ARN}',
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: { Ref: 'ApiGatewayRestApi' },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
