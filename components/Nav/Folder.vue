<template>
  <div
    :class="['folder', { 'folder-selected': open }]"
    @click="open = !open"
  >
    <div class="item">
      <div>
        <v-icon :name="icon" />
        <span class="title">{{ title }}</span>
      </div>
      <v-icon
        :name="open ? 'hi-solid-chevron-up' : 'hi-solid-chevron-down'"
        class="icon"
      />
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
  border-radius: 6px;
  padding: 10px;

  cursor: pointer;
}

.icon {
  color: #FF9101;
}

.folder:hover:not(.folder-selected) {
  background-color: #fff;
  color: #000;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-items {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.nav-items {
  display: none;
  gap: 5px;
}

.folder-selected {
  background-color: #2020270D;
}

.folder-selected > .nav-items {
  padding-top: 10px;
}

.folder-selected > .nav-items {
  display: flex !important;
  flex-direction: column;
  overflow: hidden;
}

.title {
  padding-left: 5px;
  font-family: "Archivo";
  font-weight: 500;
  font-zize: 16px;
}
</style>
