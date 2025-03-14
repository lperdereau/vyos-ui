<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-row">
        <div class="table-cell time">
          Time
        </div>
        <div class="table-cell component">
          Component
        </div>
        <div class="table-cell message">
          Message
        </div>
      </div>
    </div>
    <div class="table-body">
      <div
        v-for="(log, index) in logs"
        :key="index"
        class="table-row"
      >
        <div class="table-cell time">
          {{ log.time }}
        </div>
        <div class="table-cell component">
          {{ log.component }}
        </div>
        <div class="table-cell message">
          {{ log.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Log } from '~/shared/types/logs'

defineProps({
  logs: {
    type: Array<Log>,
    required: true,
  },
})
</script>

<style>
.table-container {
    width: 100%;
}

.table-header,
.table-body {
    display: table;
    width: 100%;
}

.table-body {
    background-color: rgba(243, 245, 248, 0.3);
}

.table-row {
    display: flex;
}

.table-cell.time {
    flex: 1;
}

.table-cell.component {
    flex: 1;
}

.table-cell.message {
    flex: 4;
}

.table-cell {
    display: table-cell;
    border: 1px solid rgba(213, 224, 231, 1);
    padding: 8px 15px;
    text-align: left;
}

.table-header .table-cell {
    border: 0px;
    color: rgba(103, 109, 124, 1);
    font-family: Work Sans;
    font-size: 14px;
    line-height: 20px;
}

.table-container
    > .table-body
    > .table-row:first-child
    > .table-cell:first-child {
    border-top-left-radius: 4px;
}

.table-container
    > .table-body
    > .table-row:first-child
    > .table-cell:last-child {
    border-top-right-radius: 4px;
}

.table-container
    > .table-body
    > .table-row:last-child
    > .table-cell:first-child {
    border-bottom-left-radius: 4px;
}

.table-container
    > .table-body
    > .table-row:last-child
    > .table-cell:last-child {
    border-bottom-right-radius: 4px;
}

.table-container > .table-body > .table-row:not(:last-child) > .table-cell {
    border-bottom: 0px;
}

.table-container > .table-body > .table-row > .table-cell:not(:last-child) {
    border-right: 0px;
}
</style>
