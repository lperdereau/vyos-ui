<template>
  <div class="consumption">
    <div class="metrics cpu">
      <span class="title">CPU</span>
      <span class="subtitle">{{ consumption.cpu.type }}</span>
      <div class="load">
        <DashboardMetric
          :value="Number(consumption.cpu.load)"
          unit="%"
          description="Load"
        />
        <DashboardMetric
          :value="Number(consumption.cpu.loadAvg1Minute)"
          unit="%"
          description="1min"
        />
        <DashboardMetric
          :value="Number(consumption.cpu.loadAvg5Minutes)"
          unit="%"
          description="5min"
        />
        <DashboardMetric
          :value="Number(consumption.cpu.loadAvg15Minutes)"
          unit="%"
          description="15min"
        />
      </div>
      <ProgressBar
        :progress="Number(consumption.cpu.load)"
        class="progress"
      />
    </div>
    <ColumnSeparator color="#eaebed" />
    <div class="metrics ram">
      <span class="title">RAM</span>
      <span class="subtitle">
        {{ consumption.ram.total.size }}
        {{ consumption.ram.total.unit }}
      </span>
      <div class="load">
        <DashboardMetric
          :value="Number(ramFree.quantity.toFixed(2))"
          :unit="ramFree.unit"
          description="Free"
        />
      </div>
      <ProgressBar
        :progress="Number(ramConsumption)"
        class="progress"
      />
    </div>
    <ColumnSeparator color="#eaebed" />
    <div class="metrics storage">
      <span class="title">Storage</span>
      <span class="subtitle">
        {{ consumption.storage.total.size }}
        {{ consumption.storage.total.unit }}
      </span>
      <div class="load">
        <DashboardMetric
          :value="Number(storageFree.quantity.toFixed(2))"
          :unit="storageFree.unit"
          description="Free"
        />
      </div>
      <ProgressBar
        :progress="Number(storageConsumption)"
        class="progress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  type Hardware,
  getRamConsumption,
  getRamFree,
  getStorageConsumption,
  getStorageFree,
  defaultHardware,
} from '#shared/types/hardware'

interface Props {
  consumption?: Hardware
}

const props = withDefaults(defineProps<Props>(), {
  consumption: defaultHardware(),
})

const ramConsumption = computed<number>(() => {
  return getRamConsumption(props.consumption.ram)
})

const ramFree = computed(() => {
  return getRamFree(props.consumption.ram)
})

const storageConsumption = computed<number>(() => {
  return getStorageConsumption(props.consumption.storage)
})

const storageFree = computed(() => {
  return getStorageFree(props.consumption.storage)
})
</script>

<style scoped>
.consumption {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.metrics {
    display: flex;
    flex-direction: column;
    min-width: 20%;
}

.load {
    display: flex;
    flex-direction: row;
    gap: 40px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.title {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #202027;
}

.subtitle {
    font-weight: 500;
    font-size: 14px;
    line-height: 16.42px;
    color: #676d7c;
    padding-top: 5px;
}
</style>
