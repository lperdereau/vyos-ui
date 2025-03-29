<template>
  <div
    ref="canvas"
    class="workflow-canvas"
  >
    <div class="ethernet-cards">
      <WorkflowCard
        v-for="(card, index) in cards.nics"
        :key="index"
        :name="card.name"
        :type="card.type"
      />
    </div>
    <div class="bond-cards">
      <WorkflowCard
        v-for="(card, index) in cards.bridges"
        :key="index"
        :name="card.name"
        :type="card.type"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Interface } from '~/shared/types/interface'

const cards = ref({
  nics: [
    { name: 'eth0', type: Interface.ETHER },
    { name: 'eth1', type: Interface.ETHER },
    { name: 'eth2', type: Interface.ETHER },
    { name: 'eth3', type: Interface.ETHER },
  ],
  bridges: [
    { name: 'br0', type: Interface.BRIDGE },
  ],
  bonds: [
    { name: 'bond0', type: Interface.BOND },
  ],
})
</script>

<style scoped>
.workflow-canvas {
  position: relative;
  padding: 20px;
  border: 1px solid #D5E0E7;
  border-radius: 8px;
  background-color: #F3F5F880;
  background-image: url("/assets/img/frame.svg");

  width: 100%;
  height: 100%;
}

.card-container {
  margin: 20px 0;
}

.ethernet-cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
