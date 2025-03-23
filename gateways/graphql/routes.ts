import gql from 'graphql-tag'

export const routes = gql`
  query ShowRoute {
    ipv4: ShowRoute(data: { key: "foo", family: inet }) {
      success
      errors
      op_mode_error {
        name
        message
        vyos_code
      }
      data {
        result
      }
    }
    ipv6: ShowRoute(data: { key: "foo", family: inet6 }) {
      success
      errors
      op_mode_error {
        name
        message
        vyos_code
      }
      data {
        result
      }
    }
  }
`

export const routes_ipv4 = gql`
  query ShowRoute {
    ipv4: ShowRoute(data: { key: "foo", family: inet }) {
      success
      errors
      op_mode_error {
        name
        message
        vyos_code
      }
      data {
        result
      }
    }
  }
`

export const routes_ipv6 = gql`
  query ShowRoute {
    ipv6: ShowRoute(data: { key: "foo", family: inet6 }) {
      success
      errors
      op_mode_error {
        name
        message
        vyos_code
      }
      data {
        result
      }
    }
  }
`
