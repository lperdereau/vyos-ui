export const InterfaceType = {
  ETHER: 'ether',
  BRIDGE: 'bridge',
  BOND: 'bond',
} as const

export interface AddrInfo {
  family: string
  local: string
  prefixlen: number
  scope: string
  tentative: boolean
  valid_life_time: number
  preferred_life_time: number
}

export interface Stats {
  rx_bytes: number
  rx_packets: number
  rx_errors: number
  rx_dropped: number
  rx_over_errors: number
  multicast: number
  tx_bytes: number
}

export interface Interface {
  ifindex: number
  ifname: string
  flags: string[]
  mtu: number
  qdisc: string
  operstate: string
  group: string
  txqlen: number
  link_type: string
  address: string
  broadcast: string
  addr_info?: AddrInfo[]
  counters_last_clear?: number
  description?: string
  stats?: Stats
}

export const getEthernetInterfaces = (interfaces: Interface[]): Interface[] => {
  return interfaces.filter((iface) => {
    return iface.link_type === InterfaceType.ETHER
  })
}

export const getBridgeInterfaces = (interfaces: Interface[]): Interface[] => {
  return interfaces.filter((iface) => {
    return iface.link_type === InterfaceType.BRIDGE
  })
}

export const getBondInterfaces = (interfaces: Interface[]): Interface[] => {
  return interfaces.filter((iface) => {
    return iface.link_type === InterfaceType.BOND
  })
}
