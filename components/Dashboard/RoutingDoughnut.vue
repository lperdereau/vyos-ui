<template>
    <div class="content">
        <div class="header">
            <span class="title">BGP</span>
            <span class="subtitle">{{ router_id }}, AS {{ system_as }}</span>
        </div>
        <div class="diagram">
            <ul class="legend">
                <li v-for="item in list">
                    <div
                        class="dot"
                        :style="`background-color: ${colors[item.label.toLowerCase()].backgroundColor}`"
                    ></div>
                    <span class="number">{{ item.value }}</span>
                    <span class="label">{{ item.label.toLowerCase() }}</span>
                </li>
            </ul>
            <div class="doughnut">
                <Doughnut
                    :data="bgpData"
                    :options="bgpOptions"
                    style="height: 200px; width: 200px"
                />
                <div class="total">
                    <span>Total</span>
                    <span>{{ total }}</span>
                </div>
            </div>
        </div>
        <div class="actions">
            <Button content="Neighbors" />
            <Button content="Routes" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
const colors = {
    established: {
        backgroundColor: "rgba(71, 214, 130, 1)",
    },
    active: {
        backgroundColor: "rgba(71, 214, 130, 0.4)",
    },
    connect: {
        backgroundColor: "rgba(255, 145, 1, 1)",
    },
    idle: {
        backgroundColor: "rgba(255, 145, 1, 0.4)",
    },
    other: {
        backgroundColor: "rgba(213, 224, 231, 0.5)",
    },
};

const list = ref([
    { label: "Established", value: 2 },
    { label: "Active", value: 1 },
    { label: "Connect", value: 1 },
    { label: "Idle", value: 1 },
    { label: "Other", value: 1 },
]);

const total = computed(() => {
    return list.value.reduce((acc, item) => acc + item.value, 0);
});

const bgpData = ref({
    labels: list.value.map((item) => item.label),
    datasets: [
        {
            data: list.value.map((item) => item.value),
            borderRadius: 2,
            backgroundColor: function (context, options) {
                const obj =
                    colors[list.value[context.dataIndex].label.toLowerCase()];
                return obj ? obj.backgroundColor : "#fff";
            },
        },
    ],
});

const router_id = ref("203.0.113.79");
const system_as = ref(65535);

const bgpOptions = ref({
    responsive: true,
    cutout: "75%",
    plugins: {
        legend: {
            display: false,
        },
    },
});
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
}

.doughnut {
    position: relative;
}

.total {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.total > span:nth-child(1) {
    color: rgba(103, 109, 124, 1);
    font-family: Work Sans;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -4%;
}

.total > span:nth-child(2) {
    font-family: Work Sans;
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    letter-spacing: -4%;
    text-align: right;
    color: rgba(32, 32, 39, 1);
}

.diagram {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    gap: 70px;
}

.legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.legend > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.legend > li > .label {
    font-family: Work Sans;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -4%;
    color: rgba(103, 109, 124, 1);
}

.legend > li > .number {
    font-family: Work Sans;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -4%;
    color: rgba(32, 32, 39, 1);
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}
.header > .title {
    font-family: Work Sans;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: -4%;
    color: rgba(32, 32, 39, 1);
}

.header > .subtitle {
    font-family: Work Sans;
    font-size: 14px;
    line-height: 100%;
    color: rgba(103, 109, 124, 1);
}

.actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
}
</style>
