<template>
    <div class="col-separator" :style="colStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
    color?: string;
    thickness?: number;
    height?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#000000",
    thickness: 1,
});

const colStyle = computed(() => {
    return {
        backgroundColor: props.color,
        width: `${props.thickness}px`,
        height: props.height,
    };
});
</script>

<style scoped>
.col-separator {
    margin: 0 10px; /* Optional: Adds some horizontal margin */
}
</style>
