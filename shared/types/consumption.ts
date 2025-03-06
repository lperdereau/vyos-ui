import convert, { type BestConversion } from "convert";

export interface CPU {
  load: Number;
  loadAvg1Minute: Number;
  loadAvg5Minutes: Number;
  loadAvg15Minutes: Number;
  type: String;
}

export interface Metric {
  size: Number;
  unit: String;
}

export interface RAM {
  total: Metric;
  used: Metric;
}

export interface Storage {
  total: Metric;
  used: Metric;
}

export interface Consumption {
  cpu: CPU;
  ram: RAM;
  storage: Storage;
}

export function computeConsumption(data: any): Consumption {
  return {
    cpu: {
      type: data.ShowCpu.data.result[0].modelname,
      load: (
        data.SystemStatus.data.result.uptime.load_average["1"] * 100
      ).toFixed(1) as Number,
      loadAvg1Minute: (
        data.SystemStatus.data.result.uptime.load_average["1"] * 100
      ).toFixed(1) as Number,
      loadAvg5Minutes: (
        data.SystemStatus.data.result.uptime.load_average["5"] * 100
      ).toFixed(1) as Number,
      loadAvg15Minutes: (
        data.SystemStatus.data.result.uptime.load_average["15"] * 100
      ).toFixed(1) as Number,
    },
    ram: {
      total: metricToBest({
        size: data.ShowMemory.data.result.total,
        unit: "B",
      }),
      used: metricToBest({
        size: data.ShowMemory.data.result.used,
        unit: "B",
      }),
    },
    storage: {
      total: metricToBest({
        size: data.ShowStorage.data.result.size,
        unit: "B",
      }),
      used: metricToBest({
        size: data.ShowStorage.data.result.used,
        unit: "B",
      }),
    },
  };
}

export function getRamConsumption(ram: RAM): Number {
  const total = convert(ram.total.size as number, ram.total.unit).to("B");
  const used = convert(ram.used.size as number, ram.used.unit).to("B");
  return (used / total) * 100;
}

export function getRamFree(ram: RAM): BestConversion {
  const total = convert(ram.total.size as number, ram.total.unit).to("B");
  const used = convert(ram.used.size as number, ram.used.unit).to("B");
  return convert(total - used, "B").to("best", "imperial");
}

export function getStorageConsumption(storage: Storage): Number {
  const total = convert(storage.total.size as number, storage.total.unit).to(
    "B",
    "imperial",
  );
  const used = convert(storage.used.size as number, storage.used.unit).to("B");
  return (used / total) * 100;
}

export function getStorageFree(storage: Storage): BestConversion {
  const total = convert(storage.total.size as number, storage.total.unit).to(
    "B",
    "imperial",
  );
  const used = convert(storage.used.size as number, storage.used.unit).to("B");
  return convert(total - used, "B").to("best", "imperial");
}

export function metricToBest(metric: Metric): Metric {
  const res = convert(metric.size as number, metric.unit).to(
    "best",
    "imperial",
  );
  return {
    size: res.quantity.toFixed(2),
    unit: res.unit,
  };
}

export function defaultConsumption(): any {
  return {
    cpu: {
      load: 0,
      loadAvg1Minute: 0,
      loadAvg5Minutes: 0,
      loadAvg15Minutes: 0,
      type: "",
    },
    ram: {
      total: {
        size: 0,
        unit: "B",
      },
      used: {
        size: 0,
        unit: "B",
      },
    },
    storage: {
      total: {
        size: 0,
        unit: "B",
      },
      used: {
        size: 0,
        unit: "B",
      },
    },
  };
}
