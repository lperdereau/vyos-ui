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
      :routes_ipv4="routesIPv4"
      :routes_ipv6="routesIPv6"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Hardware, defaultHardware } from '#shared/types/hardware'
import { InternetProtocol, type Route } from '#shared/types/routes'
import { useDependencies } from '~/composables/useDependencies'

const consumption = ref<Hardware>(defaultHardware())
const routesIPv4 = ref<Route[]>([])
const routesIPv6 = ref<Route[]>([])

const { vyOsAdapter } = useDependencies()

const hardware = await useAsyncData('dashboard', async () => {
  return await vyOsAdapter.getDashboard()
})

const routingIPv4 = await useAsyncData('routes_ipv4', async () => {
  return await vyOsAdapter.getRoutes(InternetProtocol.IPv4)
})

const routingIPv6 = await useAsyncData('routes_ipv6', async () => {
  return await vyOsAdapter.getRoutes(InternetProtocol.IPv6)
})

consumption.value = hardware.data?.value || defaultHardware()
routesIPv4.value = routingIPv4.data?.value || []
routesIPv6.value = routingIPv6.data?.value || []
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
