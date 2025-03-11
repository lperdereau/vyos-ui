<template>
  <div class="page-content">
    <h1 class="page-title">
      Dashboard
    </h1>
    <DashboardConsumption
      class="consumption"
      :consumption="consumption"
    />
    <LineSeparator color="#eaebed" />
    <DashboardRouting
      class="routing"
      :routes_ipv4="routes_ipv4"
      :routes_ipv6="routes_ipv6"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Hardware, defaultHardware } from '#shared/types/hardware'
import { InternetProtocol, type Route } from '#shared/types/routes'
import { useDependencies } from '~/composables/useDependencies'

const consumption = ref<Hardware>(defaultHardware())
const routes_ipv4 = ref<Route[]>([])
const routes_ipv6 = ref<Route[]>([])

const { vyOsAdapter } = useDependencies()

const hardware = await useAsyncData('dashboard', async () => {
  return await vyOsAdapter.getDashboard()
})

const routing_ipv4 = await useAsyncData('routes_ipv4', async () => {
  return await vyOsAdapter.getRoutes(InternetProtocol.IPv4)
})

const routing_ipv6 = await useAsyncData('routes_ipv6', async () => {
  return await vyOsAdapter.getRoutes(InternetProtocol.IPv6)
})

consumption.value = hardware.data?.value || defaultHardware()
routes_ipv4.value = routing_ipv4.data?.value || []
routes_ipv6.value = routing_ipv6.data?.value || []
</script>

<style scoped>
.page-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.page-title {
    font-family: "Archivo";
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.consumption {
    margin: 30px 0;
}

.routing {
    margin-top: 20px;
    width: 100%;
}
</style>
