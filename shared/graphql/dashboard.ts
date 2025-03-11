import gql from 'graphql-tag'

export const dashboard = gql`
  query Dashboard($key: String!) {
    system: SystemStatus(data: { key: $key }) {
      data {
        result
      }
      errors
      success
    }
    cpu: ShowCpu(data: { key: $key }) {
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
    memory: ShowMemory(data: { key: $key }) {
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
    storage: ShowStorage(data: { key: $key }) {
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
