interface SystemStatusData<T> {
  result: T
}

interface SystemStatus<T> {
  data: SystemStatusData<T>
  errors: null
  success: boolean
}

export interface VyOsRoot<T> {
  SystemStatus: SystemStatus<T>
}
