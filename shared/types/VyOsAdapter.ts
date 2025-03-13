import type { Hardware } from '#shared/types/hardware'
import type { Layout } from '#shared/types/layout'
import type { Log } from '#shared/types/logs'

export interface VyOsAdapter {
  getDashboard(): Promise<Hardware>
  getLayout(): Promise<Layout>
  getLogs(): Promise<Log[]>
}
