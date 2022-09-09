import { headers } from "@libs/headers";

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number
) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(response),
  };
};
