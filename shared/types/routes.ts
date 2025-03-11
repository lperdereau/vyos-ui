export type Nexthop = {
  flags: number
  fib: boolean
  ip: string
  afi: string
  interface_index: number
  interface_name: string
  active: boolean
  weight: number
}

export enum InternetProtocol {
  IPv4 = 'ipv4',
  IPv6 = 'ipv6',
}

export enum RouteProtocol {
  STATIC = 'static',
  CONNECTED = 'connected',
  LOCAL = 'local',
  KERNEL = 'kernel',
  OSPF = 'ospf',
  BGP = 'bgp',
  RIP = 'rip',
  IS_IS = 'is-is',
  EBGP = 'ebgp',
  IBGP = 'ibgp',
  NHRP = 'nhrp',
  BABEL = 'babel',
}

export type Route = {
  prefix: string
  prefix_len: number
  protocol: RouteProtocol
  vrf_id: number
  vrf_name: string
  selected: boolean
  dest_selected: boolean
  distance: number
  metric: number
  installed: boolean
  tag: number
  table: number
  internal_status: number
  internal_flags: number
  internal_next_hop_num: number
  internal_next_hop_active_num: number
  nexthop_group_id: number
  installed_nexthop_group_id: number
  uptime: string
  nexthops: Nexthop[]
}

const protocolTitleMap: { [key: string]: string } = {
  [RouteProtocol.KERNEL]: 'Kernel',
  [RouteProtocol.STATIC]: 'Static',
  [RouteProtocol.CONNECTED]: 'Connected',
  [RouteProtocol.LOCAL]: 'Local',
  [RouteProtocol.OSPF]: 'OSPF',
  [RouteProtocol.BGP]: 'BGP',
  [RouteProtocol.RIP]: 'RIP',
  [RouteProtocol.IS_IS]: 'IS-IS',
  [RouteProtocol.EBGP]: 'eBGP',
  [RouteProtocol.IBGP]: 'iBGP',
  [RouteProtocol.NHRP]: 'NHRP',
  [RouteProtocol.BABEL]: 'Babel',
}

export function protocolToTitle(protcol: RouteProtocol): string {
  return protocolTitleMap[protcol]
}

export type RouteStats = { [key: string]: number }

export function computeRoutes(data: any): Route[] {
  return data.map((route: any) => {
    return computeRoute(route)
  })
}

export function computeRoute(route: any): Route {
  return {
    prefix: route.prefix,
    prefix_len: route.prefix_len,
    protocol: route.protocol,
    vrf_id: route.vrf_id,
    vrf_name: route.vrf_name,
    selected: route.selected,
    dest_selected: route.dest_selected,
    distance: route.distance,
    metric: route.metric,
    installed: route.installed,
    tag: route.tag,
    table: route.table,
    internal_status: route.internal_status,
    internal_flags: route.internal_flags,
    internal_next_hop_num: route.internal_next_hop_num,
    internal_next_hop_active_num: route.internal_next_hop_active_num,
    nexthop_group_id: route.nexthop_group_id,
    installed_nexthop_group_id: route.installed_nexthop_group_id,
    uptime: route.uptime,
    nexthops: route.nexthops.map((nexthop: any) => {
      return computeNextHop(nexthop)
    }),
  }
}

export function computeNextHop(nexthop: any): Nexthop {
  return {
    flags: nexthop.flags,
    fib: nexthop.fib,
    ip: nexthop.ip,
    afi: nexthop.afi,
    interface_index: nexthop.interface_index,
    interface_name: nexthop.interface_name,
    active: nexthop.active,
    weight: nexthop.weight,
  }
}

export function getStatsRoutes(routes: Route[]): RouteStats {
  const stats: { [key: string]: number } = {}
  routes.forEach((route) => {
    if (route.protocol in stats) {
      stats[route.protocol] += 1
    }
    else {
      stats[route.protocol] = 1
    }
  })
  return stats
}
