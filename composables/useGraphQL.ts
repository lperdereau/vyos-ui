import { GraphQLClient } from "graphql-request";

const endpoint = process.env.ENDPOINT || "https://localhost/graphql"; // Example API

export const useGraphQL = () => {
  const client = new GraphQLClient(endpoint);
  return { client };
};
