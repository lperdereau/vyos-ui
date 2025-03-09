<template>
    <div class="page-content">
        <h1 class="page-title">Dashboard</h1>
        <DashboardConsumption class="consumption" :consumption="consumption" />
        <LineSeparator color="#eaebed" />
        <DashboardRouting class="routing" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    type Hardware,
    computeHardware,
    defaultHardware,
} from "#shared/types/hardware";
import {useDependencies} from "~/composables/useDependencies";

const consumption = ref<Hardware>(defaultHardware());

const {vyOsAdapter} = useDependencies();

const { data } = await useAsyncData("dashboard", async () => {
    return await vyOsAdapter.getDashboard()
});

consumption.value = data?.value || defaultHardware();
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
    margin: 30px 0;
}

.routing {
    margin-top: 20px;
    width: 100%;
}
</style>
