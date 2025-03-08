<template>
    <div class="line-separator" :style="lineStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
    color?: string;
    thickness?: number;
    width?: string;
    margin?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "#000000",
    thickness: 1,
    width: "100%",
    margin: "10px 0",
});

const lineStyle = computed(() => {
    return {
        backgroundColor: props.color,
        height: `${props.thickness}px`,
        width: props.width,
        margin: props.margin,
    };
});
</script>
