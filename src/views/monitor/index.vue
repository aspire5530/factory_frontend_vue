<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMonitorStore } from '../../stores/monitor.ts'
import MonitorCardArea from './components/MonitorCardArea.vue'
import MonitorChart from './components/MonitorChart.vue'
import Statistics from './components/Statistics.vue'
import MachineChart from './components/MachineChart.vue'

const monitorStore = useMonitorStore()

onMounted(async () => {
    await monitorStore.fetchMonitorStats()
})

const stats = computed(() => monitorStore.stats) 
const loading = computed(() => monitorStore.loading)

</script>

<template>
    <MonitorCardArea :stats="stats" :loading="loading"/>
    <el-row :gutter="20">
        <MachineChart :stats="stats" :height="320" :loading="loading"/>
        <Statistics :height="320" />
    </el-row>
    <MonitorChart />
</template>
