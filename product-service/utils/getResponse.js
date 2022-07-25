import { headers } from './headers';

export const getResponse = (body, statusCode) => {
  return {
    body: JSON.stringify(body),
    statusCode,
    headers,
  };
};
