<template>
    <div class="metric">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
        <span class="description">{{ description }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    value: Number,
    unit: String,
    description: String,
});
</script>

<style>
.metric {
    display: flex;
    flex-direction: row;
}

.value {
    font-size: 32px;
    font-weight: 800;
    color: #202027;
    font-family: "Archivo";
    letter-spacing: -2%;
}

.unit {
    font-size: 20px;
    font-weight: 800;
    color: #202027;
    font-family: "Archivo";
    letter-spacing: -2%;
    margin-top: auto;
}

.description {
    font-size: 12px;
    font-weight: 400;
    color: #676d7c;
    padding-left: 5px;
    margin-top: auto;
}
</style>
