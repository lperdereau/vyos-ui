import convert, { type BestConversion } from 'convert'
import type { GraphQLDashboard } from '~/gateways/graphql/type/GraphQLDashboard'

export interface CPU {
  load: number
  loadAvg1Minute: number
  loadAvg5Minutes: number
  loadAvg15Minutes: number
  type: string
}

export interface Metric {
  size: number
  unit: string
}

export interface RAM {
  total: Metric
  used: Metric
}

export interface Storage {
  total: Metric
  used: Metric
}

export interface Hardware {
  cpu: CPU
  ram: RAM
  storage: Storage
}

export function computeHardware(data: GraphQLDashboard): Hardware {
  return {
    cpu: {
      type: data.cpu.data.result[0].modelname,
      load: Number(
        (data.system.data.result.uptime.load_average['1'] * 100).toFixed(1),
      ),
      loadAvg1Minute: Number(
        (data.system.data.result.uptime.load_average['1'] * 100).toFixed(1),
      ),
      loadAvg5Minutes: Number(
        (data.system.data.result.uptime.load_average['5'] * 100).toFixed(1),
      ),
      loadAvg15Minutes: Number(
        (data.system.data.result.uptime.load_average['15'] * 100).toFixed(1),
      ),
    },
    ram: {
      total: metricToBest({
        size: data.memory.data.result.total,
        unit: 'B',
      }),
      used: metricToBest({
        size: data.memory.data.result.used,
        unit: 'B',
      }),
    },
    storage: {
      total: metricToBest({
        size: data.storage.data.result.size,
        unit: 'B',
      }),
      used: metricToBest({
        size: data.storage.data.result.used,
        unit: 'B',
      }),
    },
  }
}

export function getRamConsumption(ram: RAM): number {
  const total = convert(ram.total.size as number, ram.total.unit).to('B')
  const used = convert(ram.used.size as number, ram.used.unit).to('B')
  return Number((used / total) * 100)
}

export function getRamFree(ram: RAM): BestConversion {
  const total = convert(ram.total.size as number, ram.total.unit).to('B')
  const used = convert(ram.used.size as number, ram.used.unit).to('B')
  return convert(total - used, 'B').to('best', 'imperial')
}

export function getStorageConsumption(storage: Storage): number {
  const total = convert(storage.total.size as number, storage.total.unit).to(
    'B',
    'imperial',
  )
  const used = convert(storage.used.size as number, storage.used.unit).to('B')
  return Number((used / total) * 100)
}

export function getStorageFree(storage: Storage): BestConversion {
  const total = convert(storage.total.size as number, storage.total.unit).to(
    'B',
    'imperial',
  )
  const used = convert(storage.used.size as number, storage.used.unit).to('B')
  return convert(total - used, 'B').to('best', 'imperial')
}

export function metricToBest(metric: Metric): Metric {
  const res = convert(metric.size, metric.unit).to(
    'best',
    'imperial',
  )
  return {
    size: Number(res.quantity.toFixed(2)),
    unit: res.unit,
  }
}

export function defaultHardware(): any {
  return {
    cpu: {
      load: 0,
      loadAvg1Minute: 0,
      loadAvg5Minutes: 0,
      loadAvg15Minutes: 0,
      type: '',
    },
    ram: {
      total: {
        size: 0,
        unit: 'B',
      },
      used: {
        size: 0,
        unit: 'B',
      },
    },
    storage: {
      total: {
        size: 0,
        unit: 'B',
      },
      used: {
        size: 0,
        unit: 'B',
      },
    },
  }
}
