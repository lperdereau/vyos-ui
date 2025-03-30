<template>
  <div class="vue-flow__node-default card">
    <img
      src="/assets/img/nic.svg"
      alt="Ethernet Card"
      width="16"
      height="16"
    >

    <strong>{{ data.label }}</strong>

    <Handle
      type="source"
      :position="Position.Bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

defineProps<NodeProps>()
</script>

<style scoped>
@import "./card.css";
</style>
