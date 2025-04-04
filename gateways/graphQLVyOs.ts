import type { GraphQLClient } from 'graphql-request'
import type { Config } from '@lperdereau/vyos-parser'

import type { Hardware } from '#shared/types/hardware'
import { computeHardware } from '#shared/types/hardware'
import { dashboard } from '~/gateways/graphql/dashboard'

import type { FirewallConfig } from '#shared/types/firewall'

import type { Layout } from '#shared/types/layout'
import { layout } from '~/gateways/graphql/layout'

import type { Log } from '#shared/types/logs'
import { computeLogs } from '#shared/types/logs'
import { logs } from '~/gateways/graphql/logs'

import { computeRoutes, InternetProtocol, type Route } from '#shared/types/routes'
import { routes_ipv4, routes_ipv6 } from '~/gateways/graphql/routes'

import type { VyOsAdapter } from '#shared/types/VyOsAdapter'
import type { GraphQLLayout } from '~/gateways/graphql/type/graphQLLayout'
import type { VyOsRoot } from '~/gateways/graphql/type/GraphQLRoot'
import type { GraphQLDashboard } from '~/gateways/graphql/type/GraphQLDashboard'
import type { GraphQLLogs } from '~/gateways/graphql/type/GraphQLLogs'

export class GraphQLVyOs implements VyOsAdapter {
  constructor(private readonly client: GraphQLClient) {
    this.client = client
  }

  async getDashboard(): Promise<Hardware> {
    const data = await this.client.request<GraphQLDashboard>(dashboard, { key: 'foo' })
    return computeHardware(data)
  }

  async getLayout(): Promise<Layout> {
    const data = await this.client.request<VyOsRoot<GraphQLLayout>>(layout, { key: 'foo' })
    return {
      host_name: data.SystemStatus.data.result.host_name,
      version: { version: data.SystemStatus.data.result.version.version },
    }
  }

  async getLogs(): Promise<Log[]> {
    const data = await this.client.request<GraphQLLogs>(logs, { key: 'foo' })
    return computeLogs(data.logs.data.result)
  }

  async getRoutes(inet: InternetProtocol): Promise<Route[]> {
    const request = inet === InternetProtocol.IPv4 ? routes_ipv4 : routes_ipv6
    const data: any = await this.client.request(request, { key: 'foo' })
    return computeRoutes(data[inet].data.result)
  }

  async getConfig(): Promise<Config | null> {
    return null
  }

  async getFirewall(): Promise<FirewallConfig | null> {
    return null
  }
}
