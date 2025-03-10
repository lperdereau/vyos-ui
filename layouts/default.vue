<template>
  <div class="view">
    <div class="nav">
      <Nav
        :name="name"
        :version="version"
      />
    </div>

    <div class="page">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDependencies } from '~/composables/useDependencies'
import type { Layout } from '#shared/types/layout'

const { vyOsAdapter } = useDependencies()

const { data } = await useAsyncData<Layout>('result', async () => {
  return await vyOsAdapter.getLayout()
})

const name = ref(data.value?.host_name)
const version = ref(data.value?.version.version)
</script>

<style>
@import url("~/assets/css/main.css");

.nav {
    min-height: 100vh;
    width: 20%;
    display: flex;
}
.page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    padding: 33px 50px 0 50px;
}
.view {
    display: flex;
    flex-direction: row;
}
</style>
