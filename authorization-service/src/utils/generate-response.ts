import { APIGatewayAuthorizerResult } from 'aws-lambda';

export enum Effect {
  Allow = 'Allow',
  Deny = 'Deny',
}

export const generateResponse = (
  effect: Effect,
  resource: string
): APIGatewayAuthorizerResult => {
  return {
    principalId: 'test',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
