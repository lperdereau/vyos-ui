import { parseConfig, type Config } from '@lperdereau/vyos-parser'

import type { VyOsAdapter } from '#shared/types/VyOsAdapter'
import type { Hardware } from '#shared/types/hardware'
import { computeHardware } from '#shared/types/hardware'
import dashboardJson from '~/gateways/graphql/dashboard.sample.json'
import firewallJson from '~/gateways/graphql/firewall.sample.json'
import logsJson from '~/gateways/graphql/logs.sample.json'
import { parseFirewallConfig, type FirewallConfig } from '#shared/types/firewall'
import { computeRoutes, type Route } from '#shared/types/routes'
import routesJson from '~/gateways/graphql/routes.sample.json'
import type { Layout } from '#shared/types/layout'
import { computeLogs, type Log } from '#shared/types/logs'

export class InMemoryVyOs implements VyOsAdapter {
  constructor() {
    console.log('In memory load')
  }

  async getDashboard(): Promise<Hardware> {
    return computeHardware(dashboardJson.data)
  }

  async getLayout(): Promise<Layout> {
    return {
      host_name: 'vyos-lperdereau-1',
      version: { version: '1.5-rolling-202501200007' },
    }
  }

  async getLogs(): Promise<Log[]> {
    return computeLogs(logsJson.data.logs.data.result)
  }

  async getRoutes(inet: InternetProtocol): Promise<Route[]> {
    return computeRoutes(routesJson.data[inet].data.result)
  }

  async getConfig(): Promise<Config | null> {
    return parseConfig(firewallJson.data.ShowConfig.data.result)
  }

  async getFirewall(): Promise<FirewallConfig | null> {
    const config = await this.getConfig()
    if (config) {
      return parseFirewallConfig(config)
    }
    return null
  }
}
