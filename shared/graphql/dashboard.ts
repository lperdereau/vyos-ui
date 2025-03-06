import gql from "graphql-tag";

export const dashboard = gql`
  query Dashboard($key: String!) {
    SystemStatus(data: { key: $key }) {
      data {
        result
      }
      errors
      success
    }
    ShowCpu(data: { key: $key }) {
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
    ShowMemory(data: { key: $key }) {
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
    ShowStorage(data: { key: $key }) {
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
`;
