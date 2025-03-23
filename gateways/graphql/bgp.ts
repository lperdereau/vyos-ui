import gql from 'graphql-tag'

export const bgp = gql`
  query ShowBgp {
    summary: ShowSummaryBgp(data: { key: "foo" }) {
      success
      errors
      data {
        result
      }
    }
    system_as: ShowConfig(
      data: { key: "foo", path: ["protocols", "bgp", "system-as"] }
    ) {
      success
      errors
      data {
        result
      }
    }
    router_id: ShowConfig(
      data: {
        key: "foo"
        path: ["protocols", "bgp", "parameters", "router-id"]
      }
    ) {
      success
      errors
      data {
        result
      }
    }
  }
`
