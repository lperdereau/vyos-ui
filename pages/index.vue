<template>
    <div class="page-content" @click="handle">
        <h1>Dashboard</h1>
        <DashboardConsumption class="consumption" :consumption="consumption" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGraphQL } from "~/composables/useGraphQL";
import { dashboard } from "#shared/graphql/dashboard";

const consumption = ref({
    cpu: {
        load: 85,
        loadAvg1Minute: 32,
        loadAvg5Minutes: 75,
        loadAvg15Minutes: 79,
        type: "D0-Premium-Intel",
    },
    ram: {
        total: {
            size: 1,
            unit: "GB",
        },
        used: {
            size: 350,
            unit: "MB",
        },
    },
    storage: {
        total: {
            size: 4096,
            unit: "GB",
        },
        used: {
            size: 306,
            unit: "GB",
        },
    },
});

const { client } = useGraphQL();

const { data } = await useAsyncData("result", async () => {
    return await client.request(dashboard, { key: "foo" });
});

// Fetch on the client using useQuery for hydration
const { data: result } = useQuery({
    queryKey: ["result"],
    initialData: data.value, // Use SSR-fetched data as initial state
});

console.log(data.value);
console.log(result);
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
