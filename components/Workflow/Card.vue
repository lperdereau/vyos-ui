<template>
  <div class="workflow-card">
    <img
      v-if="Interface.ETHER === type"
      src="/assets/img/nic.svg"
      alt="Ethernet Card"
      width="16"
      height="12"
    >
    <strong>{{ name }}</strong>
  </div>
</template>

<script setup lang="ts">
import { Interface } from '~/shared/types/interface'

type Props = {
  name: string
  type: Interface[keyof typeof Interface]
}
defineProps<Props>()
</script>

<style scoped>
.workflow-card {
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
