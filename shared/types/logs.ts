import type { GraphQLLog } from '~/gateways/graphql/type/GraphQLLogs'

export interface Log {
  time: string
  component: string
  message: string
}

export function computeLogs(logsJson: GraphQLLog[]): Log[] {
  return logsJson.map((log) => {
    return {
      time: unixTimestampToDate(log.realtime_timestamp),
      component: `${log.comm}[${log.pid}]`,
      message: log.message,
    }
  })
}

function unixTimestampToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp / 1000)
  return date.toUTCString().slice(5, 22)
}
