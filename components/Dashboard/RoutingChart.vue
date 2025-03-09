<template>
    <div class="header">
        <div class="tabs">
            <span :class="{ active: active == 'ipv4' }" @click="handle('ipv4')"
                >IPv4</span
            >
            <span :class="{ active: active == 'ipv6' }" @click="handle('ipv6')"
                >IPv6</span
            >
        </div>
        <div class="total">
            <span>Total: </span>
            <span>{{ routes_total }}</span>
        </div>
    </div>
    <LineSeparator color="#eaebed" margin="0 0 20px 0" />
    <Bar :data="data" :options="options" style="min-width: 500px" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
    result_computed_ipv4,
    result_computed_ipv6,
} from "#shared/graphql/dashboard";

const active = ref("ipv4");

const routes_total = ref(160);

function handle(value: string) {
    active.value = value;
}

const colors = {
    kernel: {
        backgroundColor: "rgba(255, 145, 1, 0.7)",
    },
    connected: {
        backgroundColor: "rgba(71, 214, 130, 0.7)",
    },
    rip: {
        backgroundColor: "rgba(163, 174, 179, 0.7)",
    },
    ospf: {
        backgroundColor: "rgba(47, 128, 237, 0.7)",
    },
    "is-is": {
        backgroundColor: "rgba(194, 85, 246, 0.7)",
    },
    ebgp: {
        backgroundColor: "rgba(246, 85, 85, 0.7)",
    },
    ibgp: {
        backgroundColor: "rgba(255, 191, 18, 0.7)",
    },
    nhrp: {
        backgroundColor: "rgba(164, 210, 31, 0.7)",
    },
    babel: {
        backgroundColor: "rgba(64, 235, 225, 0.7)",
    },
};

const data = computed(() => {
    const result_computed = ref<any>([]);
    if (active.value === "ipv4") {
        result_computed.value = result_computed_ipv4;
    } else {
        result_computed.value = result_computed_ipv6;
    }

    return {
        labels: result_computed.value.map((item: any) => item.label),
        datasets: [
            {
                data: result_computed.value.map((item: any) => item.data),
                borderRadius: 2,
                backgroundColor: function (context, options) {
                    const obj =
                        colors[
                            result_computed.value[
                                context.dataIndex
                            ].label.toLowerCase()
                        ];
                    return obj ? obj.backgroundColor : "#fff";
                },
            },
        ],
    };
});

const options = ref({
    indexAxis: "y",
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
});
</script>

<style scoped>
.tabs {
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.total {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.total > span:nth-child(2) {
    font-family: Work Sans;
    font-weight: 600;
    font-size: 16px;
}

.active {
    font-family: Work Sans;
    font-weight: 500;
    font-size: 16px;

    border-bottom: 2px solid rgba(255, 145, 1, 1);
}

.tabs > span {
    cursor: pointer;
}

.tabs > span:not(.active) {
    color: rgba(103, 109, 124, 1);
}
</style>
