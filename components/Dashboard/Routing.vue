<template>
  <div class="summary">
    <div class="routing-summary">
      <DashboardRoutingChart
        v-model:active="activeInet"
        :route_stats="route_stats"
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
  routesIPv4?: Route[]
  routesIPv6?: Route[]
}

const props = withDefaults(defineProps<Props>(), {
  routesIPv4: () => [],
  routesIPv6: () => [],
})
const route_stats = computed<RouteStats>(() => {
  const routes
    = activeInet.value === InternetProtocol.IPv4
      ? props.routesIPv4
      : props.routesIPv6
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
