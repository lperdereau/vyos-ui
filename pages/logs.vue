<template>
    <div class="page-content">
        <h1 class="page-title">Logs</h1>
        <div class="content">
            <LogsTable :logs="logs" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDependencies } from "~/composables/useDependencies";
import type { Log } from "~/shared/types/logs";

const { vyOsAdapter } = useDependencies();

const { data } = await useAsyncData("logs", async () => {
    return await vyOsAdapter.getLogs();
});

const logs: Log[] = data?.value || [];
</script>

<style>
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

.content {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
}
</style>
