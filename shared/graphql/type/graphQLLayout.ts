interface Version {
  version: string
  flavor: string
  built_by: string
  built_on: string
  build_uuid: string
  build_git: string
  build_branch: string
  release_train: string
  architecture: string
  build_type: string
  build_comment: string
  bugtracker_url: string
  documentation_url: string
  project_news_url: string
  support_url: string
  system_arch: string
  system_type: string
  boot_via: string
  hardware_vendor: string
  hardware_model: string
  hardware_serial: string
  hardware_uuid: string
  secure_boot: string
}

interface LoadAverage {
  1: number
  5: number
  15: number
}

interface Uptime {
  uptime: string
  load_average: LoadAverage
}

interface Ram {
  total: number
  free: number
  used: number
  buffers: number
  cached: number
}

export interface GraphQLLayout {
  host_name: string
  version: Version
  uptime: Uptime
  ram: Ram
}
