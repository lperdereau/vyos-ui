<template>
    <div class="line-separator" :style="lineStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
    color?: string;
    thickness?: number;
    width?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#000000",
    thickness: 1,
    width: "100%",
});

const lineStyle = computed(() => {
    return {
        backgroundColor: props.color,
        height: `${props.thickness}px`,
        width: props.width,
    };
});
</script>

<style scoped>
.line-separator {
    margin: 10px 0; /* Optional: Adds some vertical margin */
}
</style>
