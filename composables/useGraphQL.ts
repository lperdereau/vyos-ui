import { GraphQLClient } from "graphql-request";

const endpoint = process.env.ENDPOINT || "https://10.14.99.190/graphql"; // Example API

export const useGraphQL = () => {
  const client = new GraphQLClient(endpoint);
  return { client };
};
