<template>
  <BezierEdge
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
    :style="style"
  />
</template>

<script setup lang="ts">
import { BezierEdge } from '@vue-flow/core'
import type { CustomEdgeProps } from './flux.types'

const props = defineProps<CustomEdgeProps>()

const style = computed(() => {
  if (props.data.active) {
    return {
      stroke: '#FF9101',
      strokeWidth: 1.5,
    }
  }

  return {}
})
</script>
