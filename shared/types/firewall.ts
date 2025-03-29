import type { Config as VyOSConfig, Section as VyOSSection, Value as VyOSValue } from '@lperdereau/vyos-parser'

export type FirewallConfig = {
  group?: Group[]
}

type Group = {
  name: string
  description: string
  type: typeof GroupEnum[keyof typeof GroupEnum]
  content: string[] | string
}

export const GroupEnum = {
  AddressGroup: 'address-group',
  IPv6AddressGroup: 'ipv6-address-group',
  NetworkGroup: 'network-group',
  IPv6NetworkGroup: 'ipv6-network-group',
  InterfaceGroup: 'interface-group',
  MacGroup: 'mac-group',
  PortGroup: 'port-group',
  DomainGroup: 'domain-group',
} as const

const parseGroupConfig = (group: VyOSSection): Group[] => {
  return Object.keys(group).filter(key => key.startsWith(GroupEnum.AddressGroup)).map((key): Group => ({
    name: key.split(' ')[1],
    description: (group[key] as VyOSSection)?.description.toString() ?? '',
    type: GroupEnum.AddressGroup,
    content: [((group[key] as VyOSSection)?.address as VyOSValue).toString()],
  }))
}

export function parseFirewallConfig(config: VyOSConfig): FirewallConfig {
  const firewallConfig: FirewallConfig = {}

  if (config.group) {
    firewallConfig.group = parseGroupConfig(config.group)
  }

  return firewallConfig
}
