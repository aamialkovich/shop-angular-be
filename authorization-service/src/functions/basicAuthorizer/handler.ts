import { middyfy } from '@libs/lambda';
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';
import { Effect, generateResponse } from '../../utils/generate-response';
import { getCredentialsFromToken } from '@functions/basicAuthorizer/utils/get-credentials-from-token';

const { USERNAME, PASSWORD } = process.env;

const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {
    const { authorizationToken, methodArn } = event;

    const credentials = getCredentialsFromToken(authorizationToken);

    const response =
      credentials.username === USERNAME && credentials.password === PASSWORD
        ? generateResponse(Effect.Allow, methodArn)
        : generateResponse(Effect.Deny, methodArn);

    return new Promise((resolve) => resolve(response));
  } catch {
    return new Promise((resolve) => resolve(generateResponse(Effect.Deny, '')));
  }
};

export const main = middyfy(basicAuthorizer);
