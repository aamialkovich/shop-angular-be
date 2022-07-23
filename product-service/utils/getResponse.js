import { headers } from './headers';

export const getResponse = (body, statusCode) => {
  return {
    body,
    statusCode,
    headers,
  };
};
