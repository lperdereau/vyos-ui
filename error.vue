<template>
  <div>
    <NuxtLayout>
      <h2>{{ error?.statusCode }}</h2>
      <button @click="handleError">
        Go to homepage
      </button>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>
