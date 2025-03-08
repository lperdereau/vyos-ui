<template>
    <div class="page-content">
        <h1>Dashboard</h1>
        <DashboardConsumption class="consumption" :consumption="consumption" />
        <LineSeparator color="#eaebed" />
        <DashboardRouting class="routing" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGraphQL } from "~/composables/useGraphQL";
import { dashboard } from "#shared/graphql/dashboard";
import {
    type Hardware,
    computeHardware,
    defaultHardware,
} from "#shared/types/hardware";

const consumption = ref<Hardware>(defaultHardware());

const { client } = useGraphQL();

const { data } = await useAsyncData("result", async () => {
    return await client.request(dashboard, { key: "foo" });
});

consumption.value = computeHardware(data.value);
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
    margin: 20px 0;
}

.routing {
    margin-top: 20px;
    width: 100%;
}
</style>
