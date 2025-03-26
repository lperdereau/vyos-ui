<template>
  <div>
    <h1 class="page-title">
      Firewall zones
    </h1>
    <pre>
      {{ config }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useDependencies } from '~/composables/useDependencies'

const config = ref(await useDependencies().vyOsAdapter.getFirewall())
</script>

<style>
.page-title {
    font-family: "Archivo";
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}
</style>
