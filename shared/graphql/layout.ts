import gql from 'graphql-tag'

export const layout = gql`
  query Layout($key: String!) {
    SystemStatus(data: { key: $key }) {
      data {
        result
      }
      errors
      success
    }
  }
`
