<template>
  <div :class="['vue-flow__node-default', 'card', data.active ? 'card-active' : '']">
    <img
      :src="src[type]"
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
import type { CustomNodeProps } from './flux.types'
import { InterfaceType } from '~/shared/types/interface'

defineProps<CustomNodeProps>()

const src = {
  [InterfaceType.BOND]: '/img/bond.svg',
  [InterfaceType.BRIDGE]: '/img/bridge.svg',
  [InterfaceType.ETHER]: '/img/nic.svg',
}
</script>

<style>
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

  cursor: pointer;
}

.card:hover {
  border: 2px solid #FF9101;
}

.card-active {
  border: 1.5px solid #FF9101;
}
</style>
