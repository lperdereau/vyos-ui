<template>
  <div
    :class="['item', { selected: $route.path === props.to }]"
    @click="handler"
  >
    <v-icon
      v-if="icon"
      :name="icon"
    />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  to: string
  icon?: string
  title: string
}

const props = defineProps<Props>()

function handler() {
  if (props.to) navigateTo(props.to)
}
</script>

<style scoped>
.item {
  color: #676d7c;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  padding: 10px;

  cursor: pointer;
}

.item:hover {
  background-color: #fff;
  color: #000;
}

.selected {
  background-color: #fff;
  color: #000;
}

.title {
  padding-left: 5px;
  font-family: "Archivo";
  font-weight: 500;
  font-zize: 16px;
}
</style>
