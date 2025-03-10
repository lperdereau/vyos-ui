<template>
  <div class="button">
    <span>{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<style>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 32px;
  background-color: #fff;
  border: 2px solid rgba(163, 174, 179, 1);
  border-radius: 5px;
  cursor: pointer;
}

.button > span {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -2%;
  text-align: center;
  color: rgba(32, 32, 39, 1);
}
</style>
