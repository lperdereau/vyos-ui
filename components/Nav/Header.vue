<template>
  <div class="header">
    <img
      src="/img/logo.svg"
      width="38px"
      heigth="38px"
    >
    <div class="infos">
      <span class="name">{{ name }}</span>
      <span class="version">VyOS {{ version }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: 'vyr-name',
  },
  version: {
    type: String,
    default: 'N/A',
  },
})
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  height: fit-content;
}

.infos {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.version {
  font-size: 12px;
  color: #676d7c;
}
</style>
