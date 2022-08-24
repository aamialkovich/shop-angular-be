import { Credentials } from '../../../models/credentials';

export const getCredentialsFromToken = (token: string): Credentials => {
  const encodedCredentials = token.split(' ')[1];
  const buffer = Buffer.from(encodedCredentials, 'base64');
  const credentials = buffer.toString().split(':');
  return {
    username: credentials[0],
    password: credentials[1],
  };
};
