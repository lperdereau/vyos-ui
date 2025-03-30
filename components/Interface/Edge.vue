<template>
  <BezierEdge
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
  />
</template>

<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { BezierEdge } from '@vue-flow/core'

type EdgeData = {
  active: boolean
}

defineProps<EdgeProps<EdgeData>>()
</script>
