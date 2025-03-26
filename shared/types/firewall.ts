import type { Config as VyOSConfig, Section as VyOSSection } from '@lperdereau/vyos-parser'

// Define the basic types for IPv4 and IPv6
type IPv4 = string
type IPv6 = string

// Define the basic types for rules
interface Rule {
  action: string
  description?: string
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

interface FirewallGroup {
  name: string
  description: string
}

// Define the address group configuration structure
export interface AddressGroup extends FirewallGroup {
  addresses: IPv4[]
}

// Define the IPv6 address group configuration structure
export interface IPv6AddressGroup extends FirewallGroup {
  addresses: IPv6[]
}

// Define the network group configuration structure
export interface NetworkGroup extends FirewallGroup {
  networks: IPv4[]
}

// Define the IPv6 network group configuration structure
export interface IPv6NetworkGroup extends FirewallGroup {
  networks: IPv6[]
}

// Define the interface group configuration structure
export interface InterfaceGroup extends FirewallGroup {
  interfaces: string[]
}

// Define the MAC group configuration structure
export interface MacGroup extends FirewallGroup {
  macAddresses: string[]
}

// Define the port group configuration structure
export interface PortGroup extends FirewallGroup {
  ports: string[]
}

// Define the domain group configuration structure
export interface DomainGroup extends FirewallGroup {
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
        description: group[key].description ? group[key].description : '',
        addresses: [group[key].address] ? [group[key].address] : [],
      })
    }
    else if (key.startsWith('network-group')) {
      groupConfig.networkGroup?.push({
        name: key.split(' ')[1],
        description: group[key].description ?? '',
        networks: [group[key].network] ? [group[key].network] : [],
      })
    }
  }

  return groupConfig
}

function parseIPv4Config(ipv4: VyOSSection): IPv4Config {
  const ipv4Config: IPv4Config = {}

  for (const key in ipv4) {
    if (key.startsWith('name')) {
      ipv4Config[key.split(' ')[1]] = {
        defaultAction: ipv4[key]['default-action'],
      }
    }
  }

  return ipv4Config
}

function parseZoneConfig(zone: VyOSSection): ZoneConfig {
  const zoneConfig: ZoneConfig = {}

  for (const key in zone) {
    zoneConfig[key] = {
      defaultAction: zone[key]['default-action'],
      from: {},
      member: zone[key]['member'],
      localZone: zone[key]['local-zone'],
    }
    if (zone[key]['from']) {
      for (const fromKey in zone[key]['from']) {
        zoneConfig[key].from[fromKey] = {
          firewall: {
            name: zone[key]['from'][fromKey].firewall.name,
          },
        }
      }
    }
  }

  return zoneConfig
}

export function parseFirewallConfig(config: VyOSConfig): FirewallConfig {
  const firewallConfig: FirewallConfig = {}

  if (config.group) {
    firewallConfig.group = parseGroupConfig(config.group)
  }

  if (config.ipv4) {
    firewallConfig.ipv4 = parseIPv4Config(config.ipv4)
  }

  if (config.zone) {
    firewallConfig.zone = parseZoneConfig(config.zone)
  }

  return firewallConfig
}
