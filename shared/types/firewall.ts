import type { Config as VyOSConfig, Section as VyOSSection } from '@lperdereau/vyos-parser'
import Default from '~/layouts/default.vue'

// Define the basic types for IPv4 and IPv6
type IPv4 = string
type IPv6 = string

interface Name {
  name: string
}

interface Description {
  description?: string
}

// Define the basic types for rules
interface Rule extends Description {
  action: string
  // Add other rule-specific properties as needed
}

// Define the firewall configuration structure
export interface FirewallConfig {
  bridge?: BridgeConfig
  flowtable?: FlowTableConfig
  globalOptions?: GlobalOptions
  group?: GroupConfig
  ipv4?: IPv4Config
  ipv6?: IPv6Config
  zone?: ZoneConfig
}

// Define the bridge configuration structure
interface BridgeConfig {
  forward?: FilterConfig
  input?: FilterConfig
  output?: FilterConfig
  prerouting?: FilterConfig
  name?: string
}

// Define the flow table configuration structure
interface FlowTableConfig {
  [key: string]: any // Custom flow table configurations
}

// Define the global options configuration structure
interface GlobalOptions {
  allPing?: boolean
  broadcastPing?: boolean
  // Add other global options as needed
}

// Define the group configuration structure
export interface GroupConfig {
  addressGroup?: AddressGroup[]
  ipv6AddressGroup?: IPv6AddressGroup[]
  networkGroup?: NetworkGroup[]
  ipv6NetworkGroup?: IPv6NetworkGroup[]
  interfaceGroup?: InterfaceGroup[]
  macGroup?: MacGroup[]
  portGroup?: PortGroup[]
  domainGroup?: DomainGroup[]
}

// Define the IPv4 configuration structure
interface IPv4Config {
  forward?: FilterConfig
  input?: FilterConfig
  output?: OutputConfig
  prerouting?: PreroutingConfig
  defaultAction?: string
  name?: string
}

// Define the IPv6 configuration structure
interface IPv6Config {
  forward?: FilterConfig
  input?: FilterConfig
  output?: OutputConfig
  prerouting?: PreroutingConfig
  ipv6Name?: string
}

// Define the zone configuration structure
interface ZoneConfig {
  [key: string]: any // Custom zone configurations
}

// Define the filter configuration structure
interface FilterConfig {
  filter?: Rule[]
}

// Define the output configuration structure
interface OutputConfig extends FilterConfig {
  raw?: Rule[]
}

// Define the prerouting configuration structure
interface PreroutingConfig extends FilterConfig {
  raw?: Rule[]
}

export type FirewallGroup =
  | AddressGroup
  | IPv6AddressGroup
  | NetworkGroup
  | IPv6NetworkGroup
  | InterfaceGroup
  | MacGroup
  | PortGroup
  | DomainGroup

// Define the address group configuration structure
export interface AddressGroup extends Name, Description {
  addresses: IPv4[]
}

// Define the IPv6 address group configuration structure
export interface IPv6AddressGroup extends Name, Description {
  addresses: IPv6[]
}

// Define the network group configuration structure
export interface NetworkGroup extends Name, Description {
  networks: IPv4[]
}

// Define the IPv6 network group configuration structure
export interface IPv6NetworkGroup extends Name, Description {
  networks: IPv6[]
}

// Define the interface group configuration structure
export interface InterfaceGroup extends Name, Description {
  interfaces: string[]
}

// Define the MAC group configuration structure
export interface MacGroup extends Name, Description {
  macAddresses: string[]
}

// Define the port group configuration structure
export interface PortGroup extends Name, Description {
  ports: string[]
}

// Define the domain group configuration structure
export interface DomainGroup extends Name, Description {
  domains: string[]
}

function parseGroupConfig(group: VyOSSection): GroupConfig {
  const groupConfig: GroupConfig = {
    addressGroup: [],
    ipv6AddressGroup: [],
    networkGroup: [],
    ipv6NetworkGroup: [],
    interfaceGroup: [],
    macGroup: [],
    portGroup: [],
    domainGroup: [],
  }

  for (const key in group) {
    if (key.startsWith('address-group')) {
      groupConfig.addressGroup?.push({
        name: key.split(' ')[1],
        description: typeof group[key] === 'object' && 'description' in group[key] ? group[key].description as string ?? '' : '',
        addresses: typeof group[key] === 'object' && 'address' in group[key] && typeof group[key].address === 'string'
          ? [group[key].address]
          : [],
      })
    }
    else if (key.startsWith('network-group')) {
      groupConfig.networkGroup?.push({
        name: key.split(' ')[1],
        description: typeof group[key] === 'object' && 'description' in group[key] ? group[key].description as string ?? '' : '',
        networks: typeof group[key] === 'object' && 'network' in group[key] && typeof group[key].network === 'string'
          ? [group[key].network]
          : [],
      })
    }
  }

  return groupConfig
}

function parseIPv4Config(ipv4: VyOSSection): IPv4Config {
  const ipv4Config: IPv4Config = {}

  for (const key in ipv4) {
    const section = ipv4[key] as VyOSSection
    ipv4Config.name = key.split(' ')[1]
    ipv4Config.defaultAction = (section['default-action'] as string) ?? 'accept'
  }

  return ipv4Config
}

export function parseFirewallConfig(config: VyOSConfig): FirewallConfig {
  const firewallConfig: FirewallConfig = {}

  if (config.group) {
    firewallConfig.group = parseGroupConfig(config.group)
  }

  if (config.ipv4) {
    firewallConfig.ipv4 = parseIPv4Config(config.ipv4)
  }

  return firewallConfig
}
