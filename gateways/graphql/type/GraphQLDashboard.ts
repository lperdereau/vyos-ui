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

interface Uptime {
  uptime: string
  load_average: { 1: number, 5: number, 15: number }
}

interface Ram {
  total: number
  free: number
  used: number
  buffers: number
  cached: number
}

interface Cpu {
  vendor_id: string
  cpufamily: string
  model: string
  modelname: string
  stepping: string
  microcode: string
  cpu_m_hz: string
  cachesize: string
  physicalid: string
  siblings: string
  coreid: string
  cpucores: string
  apicid: string
  initialapicid: string
  fpu: string
  fpu_exception: string
  cpuidlevel: string
  wp: string
  flags: string
  bugs: string
  bogomips: string
  clflushsize: string
  cache_alignment: string
  addresssizes: string
  powermanagement: string
}

interface SystemData {
  result: {
    host_name: string
    version: Version
    uptime: Uptime
    ram: Ram
  }
}

interface System {
  data: SystemData
  errors: null
  success: boolean
}

interface CpuData {
  result: Cpu[]
}

interface CpuInfo {
  success: boolean
  errors: null
  data: CpuData
  op_mode_error: null
}

interface MemoryData {
  result: Ram
}

interface MemoryInfo {
  success: boolean
  errors: null
  data: MemoryData
  op_mode_error: null
}

interface StorageData {
  result: {
    filesystem: string
    size: number
    used: number
    avail: number
    use_percentage: string
  }
}

interface StorageInfo {
  success: boolean
  errors: null
  data: StorageData
  op_mode_error: null
}

export interface GraphQLDashboard {
  system: System
  cpu: CpuInfo
  memory: MemoryInfo
  storage: StorageInfo
}
