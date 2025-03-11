<template>
  <div class="header">
    <div class="tabs">
      <span
        :class="{ active: active == InternetProtocol.IPv4 }"
        @click="$emit('update:active', InternetProtocol.IPv4)"
      >
        IPv4
      </span>
      <span
        :class="{ active: active == InternetProtocol.IPv6 }"
        @click="$emit('update:active', InternetProtocol.IPv6)"
      >IPv6</span>
    </div>
    <div class="total">
      <span>Total: </span>
      <span>{{ routes_total }}</span>
    </div>
  </div>
  <LineSeparator
    color="#eaebed"
    margin="0 0 20px 0"
  />
  <Bar
    :data="data"
    :options="options"
    style="min-width: 500px"
  />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  InternetProtocol,
  type RouteProtocol,
  type RouteStats,
  protocolToTitle,
} from '#shared/types/routes'

interface Props {
  routeStats: RouteStats
}

const props = defineProps<Props>()
const active = defineModel<InternetProtocol>('active', { required: true })
defineEmits(['update:active'])

const routes_total = computed(() => {
  return Object.values(props.route_stats).reduce((acc, curr) => acc + curr, 0)
})

const colors = {
  'kernel': {
    backgroundColor: 'rgba(255, 145, 1, 0.7)',
  },
  'connected': {
    backgroundColor: 'rgba(71, 214, 130, 0.7)',
  },
  'local': {
    backgroundColor: 'rgba(64, 235, 225, 1)',
  },
  'static': {
    backgroundColor: 'rgba(255, 191, 18, 0.7)',
  },
  'rip': {
    backgroundColor: 'rgba(163, 174, 179, 0.7)',
  },
  'ospf': {
    backgroundColor: 'rgba(47, 128, 237, 0.7)',
  },
  'is-is': {
    backgroundColor: 'rgba(194, 85, 246, 0.7)',
  },
  'ebgp': {
    backgroundColor: 'rgba(246, 85, 85, 0.7)',
  },
  'ibgp': {
    backgroundColor: 'rgba(255, 191, 18, 0.7)',
  },
  'nhrp': {
    backgroundColor: 'rgba(164, 210, 31, 0.7)',
  },
  'babel': {
    backgroundColor: 'rgba(64, 235, 225, 0.7)',
  },
}

const data = computed(() => {
  const labels = Object.keys(props.route_stats).map((protocol: string) =>
    protocolToTitle(protocol as RouteProtocol),
  )
  return {
    labels,
    datasets: [
      {
        data: Object.keys(props.route_stats).map(
          (protocol: string) => props.route_stats[protocol],
        ),
        borderRadius: 2,
        backgroundColor: function (context) {
          if (!labels[context.dataIndex]) return '#fff'
          const label = labels[context.dataIndex].toLowerCase()
          return colors[label] ? colors[label].backgroundColor : '#fff'
        },
      },
    ],
  }
})

const options = ref({
  indexAxis: 'y',
  responsive: true,
  barThickness: 16,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      min: 0,
      ticks: {
        precision: 0,
      },
    },
  },
})
</script>

<style scoped>
.tabs {
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.total {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.total > span:nth-child(2) {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 16px;
}

.active {
  font-family: Work Sans;
  font-weight: 500;
  font-size: 16px;

  border-bottom: 2px solid rgba(255, 145, 1, 1);
}

.tabs > span {
  cursor: pointer;
}

.tabs > span:not(.active) {
  color: rgba(103, 109, 124, 1);
}
</style>
