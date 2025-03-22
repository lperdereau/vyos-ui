import type { GraphQLClient } from 'graphql-request'

import type { Hardware } from '#shared/types/hardware'
import { computeHardware } from '#shared/types/hardware'
import { dashboard } from '#shared/graphql/dashboard'

import type { Layout } from '#shared/types/layout'
import { layout } from '#shared/graphql/layout'

import type { Log } from '#shared/types/logs'
import { computeLogs } from '#shared/types/logs'
import { logs } from '#shared/graphql/logs'

import { computeRoutes, InternetProtocol, type Route } from '#shared/types/routes'
import { routes_ipv4, routes_ipv6 } from '#shared/graphql/routes'

import type { VyOsAdapter } from '#shared/types/VyOsAdapter'
import type { GraphQLLayout } from '#shared/graphql/type/graphQLLayout'
import type { VyOsRoot } from '#shared/graphql/type/GraphQLRoot'
import type { GraphQLDashboard } from '#shared/graphql/type/GraphQLDashboard'

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
    const data: any = await this.client.request(logs, { key: 'foo' })
    return computeLogs(data.logs.data.result)
  }

  async getRoutes(inet: InternetProtocol): Promise<Route[]> {
    const request = inet === InternetProtocol.IPv4 ? routes_ipv4 : routes_ipv6
    const data: any = await this.client.request(request, { key: 'foo' })
    return computeRoutes(data[inet].data.result)
  }
}
