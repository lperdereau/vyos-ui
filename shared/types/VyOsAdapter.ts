import type { Config } from '@lperdereau/vyos-parser'
import type { Hardware } from '#shared/types/hardware'
import type { Layout } from '#shared/types/layout'
import type { Log } from '#shared/types/logs'
import type { FirewallConfig } from '#shared/types/firewall'

export interface VyOsAdapter {
  getDashboard(): Promise<Hardware>
  getLayout(): Promise<Layout>
  getLogs(): Promise<Log[]>
  getConfig(): Promise<Config | null>
  getFirewall(): Promise<FirewallConfig | null>
}
