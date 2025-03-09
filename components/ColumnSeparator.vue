<template>
    <div class="col-separator" :style="colStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
    color?: string;
    thickness?: number;
    height?: string;
    margin?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#000000",
    thickness: 1,
    margin: "0 10px",
});

const colStyle = computed(() => {
    return {
        backgroundColor: props.color,
        width: `${props.thickness}px`,
        height: props.height,
        margin: props.margin,
    };
});
</script>
