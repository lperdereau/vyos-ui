<template>
    <div class="page-content">
        <h1>Dashboard</h1>
        <DashboardConsumption class="consumption" :consumption="consumption" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGraphQL } from "~/composables/useGraphQL";
import { dashboard } from "#shared/graphql/dashboard";
import {
    type Consumption,
    computeConsumption,
    defaultConsumption,
} from "#shared/types/consumption";

const consumption = ref<Consumption>(defaultConsumption());

const { client } = useGraphQL();

const { data } = await useAsyncData("result", async () => {
    return await client.request(dashboard, { key: "foo" });
});

console.log(JSON.stringify(data.value));

consumption.value = computeConsumption(data.value);
</script>

<style scoped>
.page-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.page-title {
    font-family: "Archivo";
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.consumption {
    margin-top: 20px;
}
</style>
