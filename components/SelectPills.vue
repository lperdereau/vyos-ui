<template>
  <div class="pills">
    <div
      v-for="(pill, index) in pills"
      :key="index"
      :class="['pill', { selected: pill.selected }]"
      @click="handleClick(pill)"
    >
      <span>{{ pill.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type Pill = {
  name: string
  value: object
  selected: boolean
}

const pills = defineModel<Pill[]>('pills', { required: true })
const emit = defineEmits(['update:pills'])

const handleClick = (pill: Pill) => {
  pill.selected = !pill.selected
  emit('update:pills', pills.value)
}
</script>

<style scoped>
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.pill {
  border: 1px solid #D5E0E7;
  border-radius: 34px;
  height: 30px;
  cursor: pointer;
}

.pill:hover:not(.selected) {
  background-color: #FFF5DB;
}

.selected {
  background-color: #FF9101;
  border: 1px solid #FF9101;
}

.selected:hover {
  box-shadow: 0px 0px 0px 2px rgba(255, 145, 1, 0.5);
}

.pill.selected > span {
  color: #FFF;
}

.pill span {
  font-size: 14px;
  color: #676D7C;
  padding: 0px 12px;
  line-height: 28px; vertical-align: middle;
}
</style>
