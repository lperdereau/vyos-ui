export type GraphQLLog = {
  stream_id: string
  exe: string
  cap_effective: string
  realtime_timestamp: number
  monotonic_timestamp: string
  cursor: string
  systemd_slice: string
  transport: string
  comm: string
  priority: string
  systemd_cgroup: string
  uid: string
  boot_id: string
  hostname: string
  systemd_unit: string
  message: string
  gid: string
  systemd_invocation_id: string
  runtime_scope: string
  syslog_facility: string
  syslog_identifier: string
  cmdline: string
  machine_id: string
  pid: string
}

export type GraphQLLogs = {
  logs: {
    success: boolean
    errors: string
    data: {
      result: GraphQLLog[]
    }
  }
}
