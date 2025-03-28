<template>
  <div
    :class="['folder', { selected: open }]"
    @click="open = !open"
  >
    <div class="item">
      <v-icon :name="icon" />
      <span class="title">{{ title }}</span>
    </div>
    <div class="nav-items">
      <NavItem
        v-for="item in items"
        :key="item.to"
        :to="`${to}${item.to}`"
        :title="item.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  to: string
  title: string
  items: { to: string, title: string }[]
}
const props = defineProps<Props>()

const open = ref(false)

const route = useRoute()

watchEffect(() => {
  if (route.path.startsWith(props.to)) {
    open.value = true
  }
  else {
    open.value = false
  }
})
</script>

<style scoped>
.folder {
  display: flex;
  flex-direction: column;
  color: #676d7c;
  background-color: #2020270D;
  border-radius: 6px;
  padding: 10px;

  cursor: pointer;
}

.item {
  display: flex;
  flex-direction: row;
}

.nav-items {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 5px;
}

.nav-items > * {
  display: none;
}

.selected > .nav-items > * {
  display: block !important;
  overflow: hidden;
}

.title {
  padding-left: 5px;
  font-family: "Archivo";
  font-weight: 500;
  font-zize: 16px;
}
</style>
