<template>
  <!-- <WorkflowCanva /> -->
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    style="border: 1px solid #D5E0E7; border-radius: 8px;"
  >
    <Background
      bg-color="#F3F5F880"
      variant="dots"
      color="#676d7c"
      size="1.5"
    />
    <template #node-ethernet="nodeProps">
      <InterfaceCardEthernet v-bind="nodeProps" />
    </template>

    <template #node-bond="nodeProps">
      <InterfaceCardBond v-bind="nodeProps" />
    </template>

    <template #node-bridge="nodeProps">
      <InterfaceCardBridge v-bind="nodeProps" />
    </template>
  </VueFlow>
</template>

<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Interface } from '~/shared/types/interface'

// const interfaces = {
//   nics: [{
//     name: 'eth0',
//   },
//   {
//     name: 'eth1',
//   },
//   {
//     name: 'eth2',
//   },
//   {
//     name: 'eth3',
//   }],
//   bridges: [{
//     name: 'br0',
//   },
//   {
//     name: 'br1',
//   },
//   {
//     name: 'br2',
//   },
//   {
//     name: 'br3',
//   }],
//   bonds: [{
//     name: 'bond0',
//   }],
// }

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    type: 'ethernet',
    data: { label: 'eth0' },
  },
  {
    id: '2',
    position: { x: 250, y: 50 },
    type: 'ethernet',
    data: { label: 'eth1' },
  },
  {
    id: '3',
    position: { x: 450, y: 50 },
    type: 'ethernet',
    data: { label: 'eth2' },
  },
  {
    id: '4',
    position: { x: 650, y: 50 },
    type: 'ethernet',
    data: { label: 'eth3' },
  },
  {
    id: '5',
    position: { x: 850, y: 50 },
    type: 'ethernet',
    data: { label: 'eth4' },
  },
  {
    id: '6',
    position: { x: 250, y: 150 },
    type: 'bond',
    data: { label: 'bond0' },
  },
  {
    id: '7',
    position: { x: 450, y: 150 },
    type: 'bond',
    data: { label: 'bond1' },
  },
  {
    id: '8',
    position: { x: 50, y: 250 },
    type: 'bridge',
    data: { label: 'br0' },
  },
  {
    id: '9',
    position: { x: 250, y: 250 },
    type: 'bridge',
    data: { label: 'br1' },
  },
  {
    id: '10',
    position: { x: 450, y: 250 },
    type: 'bridge',
    data: { label: 'br2' },
  },
  {
    id: '11',
    position: { x: 650, y: 250 },
    type: 'bridge',
    data: { label: 'br3' },
  },
  {
    id: '12',
    position: { x: 850, y: 250 },
    type: 'bridge',
    data: { label: 'br4' },
  },
  {
    id: '13',
    position: { x: 1050, y: 250 },
    type: 'bridge',
    data: { label: 'br5' },
  },
])

const edges = ref([
  {
    id: 'e1->6',
    source: '1',
    target: '6',
  },
  {
    id: 'e2->6',
    source: '2',
    target: '6',
  },
  {
    id: 'e3->6',
    source: '3',
    target: '6',
  },
  {
    id: 'e4->12',
    source: '4',
    target: '12',
  },
  {
    id: 'e5->7',
    source: '5',
    target: '7',
  },
  {
    id: 'e4->12',
    source: '4',
    target: '12',
  },
  {
    id: 'e6->8',
    source: '6',
    target: '8',
  },
  {
    id: 'e7->9',
    source: '7',
    target: '9',
  },
  {
    id: 'e7->13',
    source: '7',
    target: '13',
  },
  {
    id: 'e6->10',
    source: '6',
    target: '10',
  },
  {
    id: 'e6->12',
    source: '6',
    target: '12',
  },
])
</script>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
</style>
