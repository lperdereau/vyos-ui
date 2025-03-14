<template>
  <div class="summary">
    <div class="routing-summary">
      <DashboardRoutingChart
        v-model:active="activeInet"
        :route_stats="routeStats"
        @update:active="activeInet = $event"
      />
    </div>
    <ColumnSeparator
      color="#eaebed"
      margin="0 20px"
    />
    <div class="bgp">
      <DashboardRoutingDoughnut />
    </div>
    <ColumnSeparator
      color="#eaebed"
      margin="0 20px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  InternetProtocol,
  type Route,
  type RouteStats,
  getStatsRoutes,
} from '#shared/types/routes'

const activeInet = ref<InternetProtocol>(InternetProtocol.IPv4)

interface Props {
  routes_ipv4?: Route[]
  routes_ipv6?: Route[]
}

const props = withDefaults(defineProps<Props>(), {
  routes_ipv4: () => [],
  routes_ipv6: () => [],
})
const routeStats = computed<RouteStats>(() => {
  const routes
    = activeInet.value === InternetProtocol.IPv4
      ? props.routes_ipv4
      : props.routes_ipv6
  return getStatsRoutes(routes)
})
</script>

<style scoped>
.summary {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
