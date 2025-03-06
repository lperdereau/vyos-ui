<template>
    <div class="consumption">
        <div class="metrics cpu">
            <span class="title">CPU</span>
            <span class="subtitle">{{ consumption.cpu.type }}</span>
            <div class="load">
                <DashboardMetric
                    :value="consumption.cpu.load"
                    unit="%"
                    description="Load"
                />
                <DashboardMetric
                    :value="consumption.cpu.loadAvg1Minute"
                    unit="%"
                    description="1min"
                />
                <DashboardMetric
                    :value="consumption.cpu.loadAvg5Minutes"
                    unit="%"
                    description="5min"
                />
                <DashboardMetric
                    :value="consumption.cpu.loadAvg15Minutes"
                    unit="%"
                    description="15min"
                />
            </div>
            <ProgressBar :progress="consumption.cpu.load" class="progress" />
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
                    :value="ramFree.quantity"
                    :unit="ramFree.unit"
                    description="Free"
                />
            </div>
            <ProgressBar :progress="ramConsumption" class="progress" />
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
                    :value="storageFree.quantity"
                    :unit="storageFree.unit"
                    description="Free"
                />
            </div>
            <ProgressBar :progress="storageConsumption" class="progress" />
        </div>
    </div>
</template>

<script setup lang="ts">
import convert from "convert";
import { computed } from "vue";

interface CPU {
    load: Number;
    loadAvg1Minute: Number;
    loadAvg5Minutes: Number;
    loadAvg15Minutes: Number;
    type: String;
}

interface Metric {
    size: Number;
    unit: String;
}

interface RAM {
    total: Metric;
    used: Metric;
}

interface Storage {
    total: Metric;
    used: Metric;
}

interface Consumption {
    cpu: CPU;
    ram: RAM;
    storage: Storage;
}

interface Props {
    consumption: Consumption;
}

const props = withDefaults(defineProps<Props>(), {
    consumption: {
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
    },
});

const ramConsumption = computed(() => {
    const total = convert(
        props.consumption.ram.total.size,
        props.consumption.ram.total.unit,
    ).to("B");
    const used = convert(
        props.consumption.ram.used.size,
        props.consumption.ram.used.unit,
    ).to("B");
    return (used / total) * 100;
});

const ramFree = computed(() => {
    const total = convert(
        props.consumption.ram.total.size,
        props.consumption.ram.total.unit,
    ).to("B");
    const used = convert(
        props.consumption.ram.used.size,
        props.consumption.ram.used.unit,
    ).to("B");
    const result = convert(total - used, "B").to("best");
    return result;
});

const storageConsumption = computed(() => {
    const total = convert(
        props.consumption.storage.total.size,
        props.consumption.storage.total.unit,
    ).to("B");
    const used = convert(
        props.consumption.storage.used.size,
        props.consumption.storage.used.unit,
    ).to("B");
    return (used / total) * 100;
});

const storageFree = computed(() => {
    const total = convert(
        props.consumption.storage.total.size,
        props.consumption.storage.total.unit,
    ).to("B");
    const used = convert(
        props.consumption.storage.used.size,
        props.consumption.storage.used.unit,
    ).to("B");
    const result = convert(total - used, "B").to("best");
    return result;
});
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
