<template>
  <div>
    <NuxtLayout>
      <div class="error-page">
        <h1 class="page-title">
          {{ error?.statusCode }}
        </h1>
        <div class="page-content">
          <img
            src="/img/search.png"
            alt="Page not found"
            width="300"
            height="230"
          >
          <div
            v-if="error?.statusCode == 404"
            class="error-content"
          >
            <h1 class="page-title">
              Page not found
            </h1>
            <div class="error-message">
              <p> We're sorry, the page you requested could not be found </p>
              <p> Please go back to the dashboard </p>
            </div>
            <button
              class="button"
              @click="handleError"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

onBeforeMount(() => {
  console.error('Error:', error)
})
</script>

<style scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-title {
    font-family: "Archivo";
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  gap: 20px;
  padding-top: 50px;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #A3AEB3;
}

.button {
  background-color: #FF9101;
  border: 0px;
  padding: 10px 16px;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.button:hover {
  box-shadow: 0px 0px 0px 2px rgba(255, 145, 1, 0.5);
}
</style>
