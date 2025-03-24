<template>
  <div class="progress-bar">
    <div
      class="progress"
      :style="{ width: `${String(progress)}%` }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    validator(value: number) {
      return value >= 0 && value <= 100
    },
    default: 0,
  },
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  background-color: #f3f5f8 !important;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 5px;
  background-color: #ff9101;
  -webkit-transition: width 0.5s ease 0.5s;
  -moz-transition: width 0.5s ease 0.5s;
  -o-transition: width 0.5s ease 0.5s;
  transition: width 0.5s ease 0.5s;
}
</style>
