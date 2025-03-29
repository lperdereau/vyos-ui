<template>
  <div class="vue-flow__node-default card">
    <img
      src="/assets/img/bond.svg"
      alt="Bond"
      width="16"
      height="16"
    >

    <strong>{{ data.label }}</strong>

    <Handle
      type="target"
      :position="Position.Top"
    />

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
.card {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;

  width: 100px;
  border: 1px solid #D5E0E7;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 1px 4px 0px #D5E0E7;
}
</style>
