import type { Config as VyOSConfig, Section as VyOSSection, Value as VyOSValue } from '@lperdereau/vyos-parser'

export type FirewallConfig = {
  group?: Group[]
}

export type Group = {
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

const parseAddressGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.AddressGroup,
  content: ((group[key] as VyOSSection)?.address as string | string[]) ?? [],
})

const parseAddressV6Group = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.IPv6AddressGroup,
  content: ((group[key] as VyOSSection)?.address as string | string[]) ?? [],
})

const parseNetworkGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.NetworkGroup,
  content: ((group[key] as VyOSSection)?.network as string | string[]) ?? [],
})

const parseNetworkV6Group = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.IPv6NetworkGroup,
  content: ((group[key] as VyOSSection)?.network as string | string[]) ?? [],
})

const parseIntefaceGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.InterfaceGroup,
  content: ((group[key] as VyOSSection)?.interface as string | string[]) ?? [],
})

const parseMacGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.MacGroup,
  content: ((group[key] as VyOSSection)?.['mac-address'] as string | string[]) ?? [],
})

const parsePortGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.PortGroup,
  content: ((group[key] as VyOSSection)?.port as string | string[]) ?? [],
})

const parseDomainGroup = (group: VyOSSection, key: string): Group => ({
  name: key.split(' ')[1],
  description: (group[key] as VyOSSection)?.description.toString() ?? '',
  type: GroupEnum.DomainGroup,
  content: ((group[key] as VyOSSection)?.domain as string | string[]) ?? [],
})

const parseGroupConfig = (group: VyOSSection): Group[] => {
  return [
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.AddressGroup)).map((key): Group => parseAddressGroup(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.IPv6AddressGroup)).map((key): Group => parseAddressV6Group(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.NetworkGroup)).map((key): Group => parseNetworkGroup(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.IPv6NetworkGroup)).map((key): Group => parseNetworkV6Group(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.InterfaceGroup)).map((key): Group => parseIntefaceGroup(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.MacGroup)).map((key): Group => parseMacGroup(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.PortGroup)).map((key): Group => parsePortGroup(group, key)),
    ...Object.keys(group).filter(key => key.startsWith(GroupEnum.DomainGroup)).map((key): Group => parseDomainGroup(group, key)),
  ]
}

export function parseFirewallConfig(config: VyOSConfig): FirewallConfig {
  const firewallConfig: FirewallConfig = {}

  if (config.group) {
    firewallConfig.group = parseGroupConfig(config.group)
  }

  return firewallConfig
}
