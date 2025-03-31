<template>
  <!-- <WorkflowCanva /> -->
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :node-types="nodeTypes"
    :edge-types="edgeTypes"
    style="border: 1px solid #D5E0E7; border-radius: 8px;"
    @node-click="onNodeClick"
  >
    <Background
      bg-color="#F3F5F880"
      variant="dots"
      color="#676d7c"
      :size="1.5"
    />
  </VueFlow>
</template>

<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import type { GraphNode } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

import { InterfaceCard, InterfaceEdge } from '#components'
import { Interface } from '~/shared/types/interface'

const nodeTypes = {
  bond: InterfaceCard,
  bridge: InterfaceCard,
  ethernet: InterfaceCard,
}

const edgeTypes = {
  interface: InterfaceEdge,
}

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
    data: { label: 'eth0', active: false },
  },
  {
    id: '2',
    position: { x: 200, y: 50 },
    type: 'ethernet',
    data: { label: 'eth1', active: false },
  },
  {
    id: '3',
    position: { x: 350, y: 50 },
    type: 'ethernet',
    data: { label: 'eth2', active: false },
  },
  {
    id: '4',
    position: { x: 500, y: 50 },
    type: 'ethernet',
    data: { label: 'eth3', active: false },
  },
  {
    id: '5',
    position: { x: 650, y: 50 },
    type: 'ethernet',
    data: { label: 'eth4', active: false },
  },
  {
    id: '6',
    position: { x: 200, y: 150 },
    type: 'bond',
    data: { label: 'bond0', active: false },
  },
  {
    id: '7',
    position: { x: 350, y: 150 },
    type: 'bond',
    data: { label: 'bond1', active: false },
  },
  {
    id: '8',
    position: { x: 50, y: 250 },
    type: 'bridge',
    data: { label: 'br0', active: false },
  },
  {
    id: '9',
    position: { x: 200, y: 250 },
    type: 'bridge',
    data: { label: 'br1', active: false },
  },
  {
    id: '10',
    position: { x: 350, y: 250 },
    type: 'bridge',
    data: { label: 'br2', active: false },
  },
  {
    id: '11',
    position: { x: 500, y: 250 },
    type: 'bridge',
    data: { label: 'br3', active: false },
  },
  {
    id: '12',
    position: { x: 650, y: 250 },
    type: 'bridge',
    data: { label: 'br4', active: false },
  },
  {
    id: '13',
    position: { x: 800, y: 250 },
    type: 'bridge',
    data: { label: 'br5', active: false },
  },
])

const edges = ref([
  {
    id: 'e1->6',
    type: 'interface',
    source: '1',
    target: '6',
    data: { active: false },
  },
  {
    id: 'e2->6',
    type: 'interface',
    source: '2',
    target: '6',
    data: { active: false },
  },
  {
    id: 'e3->6',
    type: 'interface',
    source: '3',
    target: '6',
    data: { active: false },
  },
  {
    id: 'e4->12',
    type: 'interface',
    source: '4',
    target: '12',
    data: { active: false },
  },
  {
    id: 'e5->7',
    type: 'interface',
    source: '5',
    target: '7',
    data: { active: false },
  },
  {
    id: 'e4->12',
    type: 'interface',
    source: '4',
    target: '12',
    data: { active: false },
  },
  {
    id: 'e6->8',
    type: 'interface',
    source: '6',
    target: '8',
    data: { active: false },
  },
  {
    id: 'e7->9',
    type: 'interface',
    source: '7',
    target: '9',
    data: { active: false },
  },
  {
    id: 'e7->13',
    type: 'interface',
    source: '7',
    target: '13',
    data: { active: false },
  },
  {
    id: 'e6->10',
    type: 'interface',
    source: '6',
    target: '10',
    data: { active: false },
  },
  {
    id: 'e6->12',
    type: 'interface',
    source: '6',
    target: '12',
    data: { active: false },
  },
])

function onNodeClick({ node }: { node: GraphNode }) {
  setAllEdgesInactive()
  setAllNodesInactive()

  node.data.active = true

  const linkedEdges = getEdgesLinkToId(node)
  linkedEdges.forEach((edge) => {
    edge.data.active = true
    getLinkedNode(edge).forEach((linkedNode) => {
      linkedNode.data.active = true
    })
  })
}

function setAllEdgesInactive() {
  edges.value.forEach((edge) => {
    edge.data.active = false
  })
}

function setAllNodesInactive() {
  nodes.value.forEach((node) => {
    node.data.active = false
  })
}

function getLinkedNode(edge: any) {
  return nodes.value.filter(node => node.id === edge.target || node.id === edge.source)
}

function getEdgesLinkToId(node: GraphNode) {
  return edges.value.filter(edge => edge.source === node.id || edge.target === node.id)
}
</script>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
</style>
