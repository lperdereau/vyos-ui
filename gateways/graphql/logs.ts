import gql from 'graphql-tag'

export const logs = gql`
  query ShowLogs {
    logs: ShowLog(data: { key: "foo", utc: true, reverse: true }) {
      success
      errors
      data {
        result
      }
      op_mode_error {
        name
        message
        vyos_code
      }
    }
  }
`
