import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.ENDPOINT || 'https://127.0.0.1/graphql' // Example API

export const useGraphQL = () => {
  const client = new GraphQLClient(endpoint)
  return { client }
}
