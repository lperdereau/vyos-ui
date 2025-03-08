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

export const result_computed_ipv4 = [
  {
    label: "kernel",
    data: 12,
  },
  {
    label: "connected",
    data: 59,
  },
  {
    label: "RIP",
    data: 13,
  },
  {
    label: "OSPF",
    data: 16,
  },
  {
    label: "IS-IS",
    data: 8,
  },
  {
    label: "eBGP",
    data: 15,
  },
  {
    label: "iBGP",
    data: 5,
  },
  {
    label: "NHRP",
    data: 32,
  },
  {
    label: "Babel",
    data: 1,
  },
];

export const result_computed_ipv6 = [
  {
    label: "kernel",
    data: 12,
  },
  {
    label: "connected",
    data: 32,
  },
  {
    label: "RIP",
    data: 21,
  },
  {
    label: "OSPF",
    data: 6,
  },
  {
    label: "IS-IS",
    data: 18,
  },
  {
    label: "eBGP",
    data: 5,
  },
  {
    label: "iBGP",
    data: 25,
  },
  {
    label: "NHRP",
    data: 52,
  },
  {
    label: "Babel",
    data: 5,
  },
];
